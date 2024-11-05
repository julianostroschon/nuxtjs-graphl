import { connect, type Replies } from 'amqplib';
import type { Listener } from './contracts';

interface RabbitMQConfig {
  HOST: string;
  USERNAME: string;
  PASSWORD: string;
  PORT: number;
}

export interface RabbitMQClient {
  path: string;
  on: (event: string, listener: Listener) => Promise<Replies.Consume>;
  close: () => Promise<void>;
  send: (queue: string, event: string) => Promise<void>;
}

export async function buildRabbitMQClient(
  config: RabbitMQConfig
): Promise<RabbitMQClient> {
  const conn = await connect({
    hostname: config.HOST,
    port: config.PORT,
    username: config.USERNAME,
    password: config.PASSWORD,
  });
  const channel = await conn.createChannel();

  return {
    path: `${config.HOST}:${config.PORT}`,

    on: async (queue: string, listener: Listener): Promise<Replies.Consume> => {
      await channel.assertQueue(queue);
      return await channel.consume(queue, listener, { noAck: true });
    },

    close: async (): Promise<void> => {
      await channel.close();
    },

    send: async (queue: string, event: string): Promise<void> => {
      await channel.assertQueue(queue);
      channel.sendToQueue(queue, Buffer.from(event));
    },
  };
}
