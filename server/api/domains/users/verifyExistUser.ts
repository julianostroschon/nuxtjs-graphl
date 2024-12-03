import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'

export const verifyExistingUser = async (
  prisma: PrismaClient,
  logger: Logger,
  credentials: { username: string; password: string },
) => {
  const log = logger.child({ method: 'verifyUser' })
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: credentials.username }, { email: credentials.username }],
    },
    select: {
      username: true,
      email: true,
      passhash: true,
      id: true,
    },
  })
  if (!existingUser) {
    log.error('Usuário não localizado')
    throw new GraphQLError('auth.invalid.user')
  }

  return existingUser
}
