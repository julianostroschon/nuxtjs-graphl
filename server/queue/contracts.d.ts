import type { ConsumeMessage, Options } from 'amqplib'

export type RabbitConnectionOptions = Partial<Options.Connect> & {
  host: string
}

export type Listener = (msg: ConsumeMessage) => void
