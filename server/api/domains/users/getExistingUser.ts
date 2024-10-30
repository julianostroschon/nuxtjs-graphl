import type { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'

export const getExistingUser = async (
  prisma: PrismaClient,
  logger: Logger,
  credentials: { username: string; password: string },
) => {
  const loggi = logger.child({ method: 'getExistingUser' })
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
    loggi.error('Invalid credentials')
    throw new GraphQLError('auth.invalid.user')
  }
  const passwordsMatch =
    (await compare(credentials.password, existingUser?.passhash as string)) ||
    ''

  if (!passwordsMatch) {
    loggi.error('Invalid credentials!!')
    throw new GraphQLError('auth.invalid.pass')
  }

  return {
    username: existingUser.username,
    email: existingUser.email,
    id: existingUser.id,
  }
}
