import { ConsumeMessage } from 'amqplib'
import { Logger } from 'pino'
import logger from '../api/utils/logger'
import { getEvent } from '../queue/lib'
import { buildRabbitMQ, RabbitMQClient } from '../queue/rabbitmq'
import { getUrl, queueConfig } from '../queue/rabbitmq/lib'
import { buildContext } from './context'

import * as handlers from './handlers'

export async function startWorker(): Promise<void> {
  const controller = new AbortController()
  const rabbitmq = await buildRabbitMQ(getUrl())

  await setupListeners(controller, rabbitmq, logger)

  logger.info('Worker started')
}

type Req = ConsumeMessage & { properties: { messageId: string }; type: string }

async function setupListeners(
  controller: AbortController,
  rabbitmq: RabbitMQClient,
  logger: Logger,
): Promise<void> {
  const globalLogger = logger.child({
    queue: queueConfig.RABBIT_QUEUE_NAME,
  })

  const createContext = await buildContext(controller, logger)

  const eventsListener = (req: Req): void => {
    const eventId = req.properties.messageId
    const datasource = req.properties.type
    const event = getEvent(req)

    if (isError(event)) {
      globalLogger.warn({ error: event }, 'Error parsing message')
      return
    }

    const logger = globalLogger.child({ eventId, event })

    const handler = handlers['create']

    if (handler === undefined) {
      logger.warn(`Event of type ${req.type} has no handler`)
      return
    }

    void createContext(datasource)
      .then(async context => {
        void handler(context, event)
          .then(() => {
            logger.info('Event processed')
          })
          .catch((error: Error) => {
            logger.warn({ error }, 'Error on event processing')
          })
      })
      .catch((error: Error) => {
        logger.warn({ error }, 'Error on event processing (context)')
      })
  }
  void rabbitmq.on('queue', (req: ConsumeMessage) => {
    try {
      eventsListener(req)
    } catch (error) {
      globalLogger.error(
        { error },
        'Error on event processing (rabbitmq remoto)',
      )
    }
  })
}
