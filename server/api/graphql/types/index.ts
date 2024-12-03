import { extendType } from 'nexus'

export const pingQuery = extendType({
  type: 'Query',
  definition: t => {
    t.string('ping', {
      resolve: () => 'pong',
    })
  },
})

export * from './auth/login'
export * from './products/product'
export * from './users/user'
