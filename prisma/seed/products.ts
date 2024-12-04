import type { PrismaClient } from '@prisma/client'

export async function seedProducts(prisma: PrismaClient) {
  await prisma.product.createMany({
    data: [
      {
        name: 'beans',
        description: 'A delicious bean.',
        price: 1.5,
        stock: 10,
        createdAt: new Date(),
      },
      {
        name: 'rice',
        description: 'A delicious rice.',
        price: 2.5,
        stock: 10,
        createdAt: new Date(),
      },
    ],
  })

  return await prisma.product.findMany()
}
