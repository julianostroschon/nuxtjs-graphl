import { inputObjectType, objectType } from 'nexus'

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
