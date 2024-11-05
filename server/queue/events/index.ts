// import { DateTime } from 'luxon'
import { RabbitQueue } from '../rabbitmq/contracts'

// import { config } from '@/infra/config';
// import type { Context } from '@/server/context';
// import type { RabbitQueue } from '@/infra/queue/rabbitmq/contracts';

export interface DataEvent<BodyType> {
  moment: string | null
  datasource?: string
  body: BodyType
  type: string
}

export interface MessageOptions {
  dbControl?: boolean | { originId: string }
  ttl?: number
}

async function sendEvent<Evt>(queue: RabbitQueue, data: Evt): Promise<void> {
  await queue.publish<Evt>(data)
}

export async function sendGeneralEvent<BodyType>(
  { queue }: { queue: RabbitQueue },
  type: string,
  body: BodyType,
  // _options?: MessageOptions,
): Promise<void> {
  // const moment = DateTime.now().toUTC().toISO()
  const moment = new Date().toISOString()
  // const datasource = config.DATASOURCE
  const data = {
    // datasource,
    moment,
    type,
    body,
  }

  await sendEvent<DataEvent<BodyType>>(queue, data)
}
