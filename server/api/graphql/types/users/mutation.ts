import { extendType, inputObjectType, nonNull } from 'nexus'
import { userAdd } from '../../resolvers/user/userAdd'
import { UserResponse } from './user'

export const UserAdd = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('userAdd', {
      args: { data: nonNull(UserAddInput) },
      type: UserResponse,
      resolve: userAdd,
    })
  },
})

export const UserAddInput = inputObjectType({
  name: 'UserAddInput',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.nonNull.string('password')
  },
})
