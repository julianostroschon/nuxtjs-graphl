import type { FieldResolver } from 'nexus'
import { delProduct } from '~/server/api/domains/products'

export const productDel: FieldResolver<'Mutation', 'productDel'> = async (
  _,
  { id },
  { prisma, logger },
  info,
) => {
  const log = logger.child({ graphql: `mutation.${info.fieldName}` })
  return await delProduct(prisma, log, Number(id))
}
