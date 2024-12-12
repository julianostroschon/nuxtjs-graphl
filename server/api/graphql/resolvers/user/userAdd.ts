import type { FieldResolver } from 'nexus'
import { createUser } from '~/server/api/domains/users/add'

export const userAdd: FieldResolver<'Mutation', 'userAdd'> = async (
  _,
  { data },
  { prisma },
) => {
  return await createUser(prisma, data)
}
