import { extendType, inputObjectType, objectType } from 'nexus'

import { productGet } from '../../resolvers/products/product'

export const ProductGet = extendType({
  type: 'Query',
  definition: t => {
    t.field('productGet', {
      type: ProductResponse,
      args: { id: 'Int' },
      resolve: productGet,
      extensions: {
        protectedOperation: true, // Isso será checado no plugin
      },
    })
  },
})

export const ProductArgs = inputObjectType({
  name: 'ProductArgs',
  definition: t => {
    t.int('id')
  },
})

export const ProductResponse = objectType({
  name: 'ProductResponse',
  definition: t => {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('price')
    // t.nonNull.field('createdAt', { type: DateScalar })
  },
})
