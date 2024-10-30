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

  const passwordsMatch =
    (await compare(credentials.password, existingUser?.passhash as string)) ||
    ''

  if (!existingUser || !passwordsMatch) {
    loggi.error('Invalid credentials')
    throw new GraphQLError('Mensagem de erro personalizada', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    })
  }

  return {
    username: existingUser.username,
    email: existingUser.email,
    id: existingUser.id,
  }
}
