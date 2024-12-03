import type { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'
import { verifyExistingUser } from './verifyExistUser'

export const getExistingUser = async (
  prisma: PrismaClient,
  logger: Logger,
  credentials: { username: string; password: string },
) => {
  const log = logger.child({ method: 'getExistingUser' })
  const user = await verifyExistingUser(prisma, log, credentials)

  if (!user) {
    log.error('Invalid credentials')
    throw new GraphQLError('auth.invalid.user')
  }

  const passwordsMatch =
    (await compare(credentials.password, user?.passhash as string)) || ''

  if (!passwordsMatch) {
    log.error('Invalid credentials!!')
    throw new GraphQLError('auth.invalid.pass')
  }

  return {
    username: user.username,
    email: user.email,
    id: user.id,
  }
}
