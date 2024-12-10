import type { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { Logger } from 'pino'

export const delProduct = async (
  prisma: PrismaClient,
  logger: Logger,
  id: number,
) => {
  const product = await prisma.product.delete({
    where: { id },
    select: {
      name: true,
      id: true,
      description: true,
      price: true,
      stock: true,
      createdAt: true,
    },
  })

  if (!product) {
    logger.error('Fail to delete product')
    throw new GraphQLError('product.del.fail')
  }

  return product
}
