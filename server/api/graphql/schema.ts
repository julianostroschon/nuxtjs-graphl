import { join } from 'node:path'

import { makeSchema } from 'nexus'

import { DateScalar } from './scalars/dateScalar'
import * as types from './types'
import AuthPlugin from './types/plugins/authPlugin'

// import { LogMutationTimePlugin } from './types/plugins/LogMutationTimePlugin'

const schema = makeSchema({
  types: [DateScalar, types],
  plugins: [AuthPlugin],
  contextType: {
    module: join(process.cwd(), './server/types/context.ts'),
    export: 'GraphQLContext',
  },
  outputs: {
    schema: join(process.cwd(), 'generated/schema.graphql'),
    typegen: join(process.cwd(), 'generated/nexus-typegen.ts'),
  },
})

export { schema }
