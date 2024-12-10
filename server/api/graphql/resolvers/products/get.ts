import type { FieldResolver } from 'nexus'
import { getProductById } from '~/server/api/domains/products'

export const productGet: FieldResolver<'Query', 'productGet'> = async (
  _,
  { id },
  { prisma },
) => {
  return await getProductById(prisma, id)
}
