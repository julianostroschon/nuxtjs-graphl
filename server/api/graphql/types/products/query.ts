import { extendType } from 'nexus'
import { productLoad } from '../../resolvers/products/products'
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
