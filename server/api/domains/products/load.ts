import { PrismaClient } from '@prisma/client'

export const getProducts = async (prisma: PrismaClient) => {
  console.log({ o: 'o' })
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      // price: true,
    },
  })

  console.log({ products })

  return products
}
