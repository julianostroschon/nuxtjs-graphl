import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const getProductById = async (prisma: PrismaClient, id: number) => {
  const product = await prisma.product.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      stock: true,
      createdAt: true,
    },
  })

  if (!product) {
    throw new GraphQLError('Invalid product')
  }

  return product
}
