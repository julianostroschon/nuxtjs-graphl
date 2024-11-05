import { extendType } from 'nexus'

export const pingQuery = extendType({
  type: 'Query',
  definition: t => {
    t.string('ping', {
      resolve: async (_, __, ctx) => {
        await ctx.queue.send('ping', { message: 'pong' })
        // console.log()
        return 'pong'
      },
    })
  },
})
export const pongQuery = extendType({
  type: 'Query',
  definition: t => {
    t.string('pong', {
      resolve: async (_, __, ctx) => {
        await ctx.queue.on('ping', (msg: Buffer) =>
          ctx.logger.warn(`evento ${JSON.stringify(msg)}`),
        )
        // console.log()
        return 'ping'
      },
    })
  },
})

export * from './auth/login'
export * from './users/user'
