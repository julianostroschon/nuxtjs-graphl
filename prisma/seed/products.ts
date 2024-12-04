import type { PrismaClient } from '@prisma/client'

export async function seedProducts(prisma: PrismaClient) {
  await prisma.product.createMany({
    data: [
      {
        name: 'beans',
        description: 'A delicious bean.',
        price: 1.5,
      },
      {
        name: 'rice',
        description: 'A delicious rice.',
        price: 2.5,
      },
    ],
  })

  return await prisma.product.findMany()
}
