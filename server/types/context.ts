import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { Logger } from 'pino'

export interface GraphQLContext {
  prisma: PrismaClient
  logger: Logger
  event: H3Event // Ajuste o tipo conforme necessário
}
