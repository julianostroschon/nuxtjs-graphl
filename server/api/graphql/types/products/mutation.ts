import { extendType, inputObjectType, nonNull } from 'nexus'
import { productAdd } from '../../resolvers/products/add'
import { productDel } from '../../resolvers/products/del'
import { ProductResponse } from './product'

export const ProductAdd = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('productAdd', {
      args: { data: nonNull(AddInput) },
      type: ProductResponse,
      resolve: productAdd,
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

export const ProductDel = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('productDel', {
      args: { id: nonNull('ID') },
      type: ProductResponse,
      resolve: productDel,
    })
  },
})
