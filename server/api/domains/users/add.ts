import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const createUser = async (
  prisma: PrismaClient,
  data: Record<string, string>,
) => {
  const existingUser = await prisma.user.findFirst({
    where: { username: data.username },
    select: {
      id: true,
    },
  })
  if (existingUser) {
    throw new GraphQLError('User already exists')
  }

  const userCreated = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passhash: data.passhash,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })

  return userCreated
}
