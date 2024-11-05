import { connect, ConsumeMessage, type Options, type Replies } from 'amqplib'
import { RabbitMQConsumer } from './contracts'

export async function buildRabbitMQClient(
  config: Options.Connect,
): Promise<RabbitMQConsumer> {
  // const connection = getUrl()
  const conn = await connect(config)
  const channel = await conn.createChannel()

  return {
    path: `${config.hostname}:${config.port}`,

    on: async (
      queue: string,
      onMessage: (msg: ConsumeMessage | null) => void,
    ): Promise<Replies.Consume> => {
      await channel.assertQueue(queue)
      return await channel.consume(queue, onMessage, { noAck: true })
    },

    close: async (): Promise<void> => {
      await channel.close()
    },

    send: async (queue: string, event: string): Promise<void> => {
      await channel.assertQueue(queue)
      channel.sendToQueue(queue, Buffer.from(event))
    },
  }
}
