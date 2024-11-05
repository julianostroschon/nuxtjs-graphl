import { makeSchema } from 'nexus'
import path, { join } from 'path'

import * as types from './types'

function setPath(path: string): string {
  return join(process.cwd(), path)
}

const outputs = {
  typegen: setPath('generated/nexus-typegen.ts'),
  schema: setPath('generated/schema.graphql'),
}

export const schema = makeSchema({
  outputs,
  types,
  contextType: {
    module: path.join(process.cwd(), './server/types/context.ts'),
    // module: path.join(__dirname, '../contracts'),
    export: 'Context',
  },
})
