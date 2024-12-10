import type { FieldResolver } from 'nexus'
import { addProduct } from '~/server/api/domains/products'

export const productAdd: FieldResolver<'Mutation', 'productAdd'> = async (
  _,
  { data },
  { prisma, logger },
  info
) => {

  const log = logger.child({ graphql: `mutation.${info.fieldName}` })
  return await addProduct(prisma, log, data)
}
