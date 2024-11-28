import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const getProductById = async (prisma: PrismaClient, id: number) => {
  const product = await prisma.user.findFirst({
    where: { id },
    select: {
      username: true,
      email: true,
      passhash: true,
      id: true,
    },
  })

  if (!product) {
    throw new GraphQLError('Invalid product')
  }

  return product
}
