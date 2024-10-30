import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { Logger } from 'pino'

export interface GraphQLContext {
  prisma: PrismaClient
  logger: Logger
  event: H3Event
  username: string | undefined
  datasource: string | undefined // Ajuste o tipo conforme necessário
}
