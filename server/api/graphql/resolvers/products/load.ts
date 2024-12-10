import type { FieldResolver } from 'nexus'
import { getProducts } from '~/server/api/domains/products'

export const productLoad: FieldResolver<'Query', 'productLoad'> = async (
  _,
  __,
  { prisma },
) => {
  return await getProducts(prisma)
}
