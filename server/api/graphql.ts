import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

import { buildQueueProducer } from '../queue'
import { schema } from './graphql/schema'
import logger from './utils/logger'
import { prisma } from './utils/prisma'

// Defina o tipo de contexto
// type Context = {
//   prisma: PrismaClient
//   event: H3Event
// }

const apollo = new ApolloServer({ schema })

export default startServerAndCreateH3Handler(apollo, {
  context: async event => {
    const queue = await buildQueueProducer()

    return {
      logger,
      prisma,
      queue,
      event,
    }
  },
})
