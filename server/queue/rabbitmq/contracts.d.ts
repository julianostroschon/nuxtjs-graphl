import type { ConsumeMessage, Replies } from 'amqplib'

export interface RabbitQueue {
  publish: <T>(data: T) => Promise<void>
  disconnect: () => Promise<void>
}

export type Listener = (msg: ConsumeMessage) => void

export type QueueConfig = Readonly<{
  RABBIT_USERNAME: string
  RABBIT_PASSWORD: string
  RABBIT_HOST: string
  RABBIT_PORT: number
  RABBIT_DURABILITY?: boolean
  RABBIT_QUEUE_NAME: string
}>

export interface RabbitMQConsumer {
  path: string
  on: (
    queue: string,
    onMessage: (msg: ConsumeMessage | null) => void,
  ) => Promise<Replies.Consume>
  close: () => Promise<void>
  send: (queue: string, event: string) => Promise<void>
}

export interface RabbitMQProducer {
  publish: (message: string) => Promise<void>
  disconnect: () => Promise<void>
}
