import { makeSchema } from 'nexus'
import { join } from 'path'

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
})
