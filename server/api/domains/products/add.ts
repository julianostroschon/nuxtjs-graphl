import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'
import { AddInput } from '../../graphql/types/products/mutation'

export const addProduct = async (
  prisma: PrismaClient,
  logger: Logger,
  data: typeof AddInput,
) => {
  const product = await prisma.product.create({
    // where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      createdAt: new Date().toISOString(),
    },
    select: {
      id: true,
      name: true,
      // price: true,
    },
  })

  if (!product) {
    logger.error('Fail to add product')
    throw new GraphQLError('product.add.fail')
  }

  return product
}
