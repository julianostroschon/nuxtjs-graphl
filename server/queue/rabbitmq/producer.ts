import type { RabbitQueue } from './contracts'
import { RabbitMQProducer } from './entity'

export async function buildQueueProducer(): Promise<RabbitQueue> {
  const rabbit = new RabbitMQProducer(process.env.RABBIT_QUEUE_NAME || 'queue')

  await rabbit.connect()
  return {
    publish: async <T>(data: T): Promise<void> => {
      await rabbit.publish(JSON.stringify(data))
    },
    disconnect: async (): Promise<void> => {
      await rabbit.disconnect()
    },
  }
}
