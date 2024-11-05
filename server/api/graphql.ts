import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

import { buildRabbitMQ } from '../queue/rabbitmq'
import { getUrl } from '../queue/rabbitmq/lib'
import { schema } from './graphql/schema'
import logger from './utils/logger'
import { prisma } from './utils/prisma'

const apollo = new ApolloServer({ schema })

export default startServerAndCreateH3Handler(apollo, {
  context: async event => {
    const queue = await buildRabbitMQ(getUrl())

    return {
      logger,
      prisma,
      queue,
      event,
    }
  },
})
