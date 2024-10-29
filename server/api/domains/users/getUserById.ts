import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const getUserByID = async (prisma: PrismaClient, id: number) => {
  const existingUser = await prisma.user.findFirst({
    where: { id },
    select: {
      username: true,
      email: true,
      passhash: true,
      id: true,
    },
  })

  if (!existingUser) {
    throw new GraphQLError('Invalid user')
  }

  return {
    username: existingUser.username,
    email: existingUser.email,
    id: existingUser.id,
  }
}
