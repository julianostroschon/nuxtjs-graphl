import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql/types'
import { prisma } from './utils/prisma'

// Defina o tipo de contexto
// type Context = {
//   prisma: PrismaClient
//   event: H3Event
// }

const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), 'generated/schema.graphql'),
    typegen: join(process.cwd(), 'generated/nexus-typegen.ts'),
  },
})

const apollo = new ApolloServer({ schema: schema })

export default startServerAndCreateH3Handler(apollo, {
  context: async event => {
    return {
      prisma,
      event,
    }
  },
})
