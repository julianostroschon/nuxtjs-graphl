import { RabbitQueue } from './rabbitmq/contracts'
import { queueProducer } from './rabbitmq/producer'

const queue = Symbol('queue')

export async function buildQueueProducer(): Promise<RabbitQueue> {
  const cachequeue = new Map<typeof queue, RabbitQueue>()
  const actualProducer = cachequeue.get(queue)
  const producer = await queueProducer()

  if (actualProducer === undefined) {
    cachequeue.set(queue, producer)
  }

  return actualProducer ?? producer
}
