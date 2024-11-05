import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { Logger } from 'pino'
import { RabbitMQClient } from '~/server/queue/rabbitmq'

export type Context = {
  prisma: PrismaClient
  event: H3Event
  queue: RabbitMQClient
  logger: Logger
}
