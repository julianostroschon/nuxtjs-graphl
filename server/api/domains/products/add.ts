import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'

export const addProduct = async (
  prisma: PrismaClient,
  logger: Logger,
  data: Record<string, string | number>,
) => {
  const product = await prisma.product.create({
    // where: { id },
    data: {
      ...data,
      createdAt: new Date(),
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
