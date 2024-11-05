import { connect, ConsumeMessage, type Options, type Replies } from 'amqplib'
import logger from '../api/utils/logger'
import { getEvent } from './lib'

export interface RabbitMQClient {
  path: string
  on: (
    event: string,
    onMessage: (msg: ConsumeMessage | null) => void,
  ) => Promise<Replies.Consume>
  close: () => Promise<void>
  send: (queue: string, event: Record<string, unknown>) => Promise<void>
}

export async function buildRabbitMQ(config: Options.Connect) {
  const conn = await connect({
    hostname: config.hostname,
    username: config.username,
    password: config.password,
    port: config.port,
  })
  const channel = await conn.createChannel()

  return {
    path: `${config.hostname}:${config.port}`,

    on: async (
      queue: string,
      onMessage: (msg: ConsumeMessage | null) => void,
    ): Promise<Replies.Consume> => {
      await channel.assertQueue(queue)

      return await channel.consume(queue, msg => onMessage(getEvent(msg)), {
        noAck: true,
      })
    },

    close: async (): Promise<void> => {
      await channel.close()
    },

    send: async (
      queue: string,
      event: Record<string, unknown>,
    ): Promise<void> => {
      await channel.assertQueue(queue)

      const evt = JSON.stringify({
        event,
        moment: new Date().toISOString(),
      })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(evt)))
      logger.info({ event: evt }, `Evento enviado à fila ${queue}`)
    },
  }
}
