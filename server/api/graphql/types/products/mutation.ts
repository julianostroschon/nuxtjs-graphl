import { extendType, inputObjectType, nonNull } from 'nexus'
import { productAdd } from '../../resolvers/products/add'
import { ProductResponse } from './product'

export const ProductAdd = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('productAdd', {
      type: ProductResponse,
      args: { data: nonNull(AddInput) },
      resolve: productAdd,
      // extensions: {
      // protectedOperation: true, // Isso será checado no plugin
      // },
    })
  },
})

export const AddInput = inputObjectType({
  name: 'ProductAddInput',
  definition: t => {
    t.nonNull.string('name')
    t.nonNull.float('stock')
    t.nonNull.float('price')
    t.nonNull.string('description')
  },
})
