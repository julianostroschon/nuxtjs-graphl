import type { Options } from 'amqplib'
import { RabbitConnectionOptions } from '../contracts'
import { QueueConfig } from './contracts'

export function getUrl(): Options.Connect {
  return {
    username: queueConfig.RABBIT_USERNAME,
    password: queueConfig.RABBIT_PASSWORD,
    hostname: queueConfig.RABBIT_HOST,
    port: queueConfig.RABBIT_PORT,
    // host: queueConfig.RABBIT_HOST,
  }
}

export function getContent(message: string): Buffer {
  return Buffer.from(message)
}

export const queueConfig: QueueConfig = Object.freeze({
  RABBIT_HOST: process.env.RABBIT_HOST,
  RABBIT_PORT: Number(process.env.RABBIT_PORT),
  RABBIT_USERNAME: process.env.RABBITMQ_DEFAULT_USER,
  RABBIT_PASSWORD: process.env.RABBITMQ_DEFAULT_PASS,
  RABBIT_DURABILITY: process.env.RABBIT_DURABILITY === 'true',
  RABBIT_QUEUE_NAME: process.env.RABBIT_QUEUE_NAME,
})
