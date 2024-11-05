export interface RabbitQueue {
  publish: <T>(data: T) => Promise<void>
  disconnect: () => Promise<void>
}

export interface QueueConfig {
  RABBIT_USERNAME: string
  RABBIT_PASSWORD: string
  RABBIT_HOST: string
  RABBIT_PORT: number
  RABBIT_DURABILITY?: boolean
  RABBIT_QUEUE_NAME: string
}
