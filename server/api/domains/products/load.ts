import { PrismaClient } from '@prisma/client'

export const getProducts = async (prisma: PrismaClient) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      stock: true,
      createdAt: true,
    },
  })

  return products ?? []
}
