import { extendType, nonNull, objectType } from 'nexus'
import { productGet } from '../../resolvers/products/get'
import { productLoad } from '../../resolvers/products/load'

import { ProductResponse } from './product'

export const productLoadQuery = extendType({
  type: 'Query',
  definition: t => {
    t.list.nonNull.field('productLoad', {
      type: ProductResponse,
      resolve: productLoad,
    })
  },
})

export const ProductGet = extendType({
  type: 'Query',
  definition: t => {
    t.field('productGet', {
      type: ProductResponse,
      args: { id: nonNull('Int') },
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
