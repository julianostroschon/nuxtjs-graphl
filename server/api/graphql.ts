import { ApolloServer } from '@apollo/server'
import {
  H3ContextFunctionArgument,
  startServerAndCreateH3Handler,
} from '@as-integrations/h3'

import logger from './utils/logger'
import { prisma } from './utils/prisma'

import type { JwtPayload } from 'jsonwebtoken'
import { schema } from './graphql/schema'
import { verifyToken } from './utils/jwt'

const apollo = new ApolloServer({ schema })

export default startServerAndCreateH3Handler(apollo, {
  context: async ({ event }: H3ContextFunctionArgument) => {
    let decodeToken: JwtPayload | undefined
    let username: string | undefined = undefined

    const datasource: string | undefined = getHeader(event, 'datasource')

    const token = getCookie(event, 'sid')
    if (token !== undefined) {
      decodeToken = await verifyToken(token as string)
    }
    if (decodeToken !== undefined) {
      username = decodeToken.email
    }
    const log = logger.child({ username: username, datasource })

    return {
      prisma,
      event,
      logger: log,
      username,
      datasource,
    }
  },
})
