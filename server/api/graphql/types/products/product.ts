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

export const ProductList = objectType({
  name: 'ProductList',
  definition: t => {
    t.list.nonNull.field('nodes', { type: ProductResponse })
    // t.nonNull.field('pagination', { type: Pagination })
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
    t.nonNull.string('description')
    t.nonNull.float('price')
    t.int('stock')
    t.date('createdAt')
    // t.nonNull.field('createdAt', { type: DateScalar })
  },
})
