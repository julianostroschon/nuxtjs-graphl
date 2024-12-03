import type { PrismaClient } from '@prisma/client'

export async function seedProducts(prisma: PrismaClient) {
  await prisma.product.createMany({
    data: [
      {
        name: 'beans',
      },
      {
        name: 'rice',
      },
    ],
  })

  return await prisma.product.findMany()
}
