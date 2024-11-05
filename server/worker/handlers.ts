import { H3Event } from 'h3'
import { GraphQLContext } from '../types/context'

export type EventType = 'create' | 'update' | 'delete'
export type EventHandler = (
  context: GraphQLContext,
  event: H3Event,
) => Promise<void>
export default {
  create: (ctx, req) => {
    console.log('create', req)
    return req
  },
} as Record<EventType, EventHandler>
