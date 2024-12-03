import { GraphQLError } from 'graphql'
import { plugin } from 'nexus'

const AuthPlugin = plugin({
  name: 'AuthPlugin',
  description: 'Plugin to add auth to the context',

  onCreateFieldResolver(config) {
    return async (root, args, ctx, info, next) => {
      if (ctx.authChecked) {
        return next(root, args, ctx, info)
      }

      const extensions = config.fieldConfig.extensions ?? {}

      const isPublic =
        'publicOperations' in extensions
          ? (extensions as { publicOperations?: boolean }).publicOperations
          : false

      console.log({ isPublic, ctx })

      if (!isPublic && !ctx.username) {
        throw new GraphQLError('Unauthorized')
      }

      ctx.authChecked = true
      return next(root, args, ctx, info)
    }
  },
})
export default AuthPlugin
