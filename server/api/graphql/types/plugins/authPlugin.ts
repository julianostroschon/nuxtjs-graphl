import { createPlugin } from 'nexus'

const AuthPlugin = createPlugin({
  name: 'AuthPlugin',
  description: 'Plugin to add auth to the context',
  onCreateFieldResolver(config) {
    return async (root, args, ctx, info, next) => {
      const extensions = config.fieldConfig.extensions ?? {}
      const isPublic =
        'publicOperations' in extensions
          ? (extensions as { publicOperations?: boolean }).publicOperations
          : false
      console.log('Extensions:', config)
      // const token = getCookie(info, 'sid')
      // const decodeToke = await verifyToken(token as string)

      // console.log('Headers:', decodeToke)
      console.log('isPublic', isPublic)
      // if (config.fieldConfig.extensions?.auth) {
      //   if (!ctx.user) {
      //     throw new Error('Unauthorized')
      //   }
      // }
      return next(root, args, ctx, info)
    }
  },
})
export default AuthPlugin
