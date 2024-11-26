import { prisma } from './utils/prisma'
import { getRedisClient } from './utils/redis'

export default defineEventHandler(async event => {
  const token = getRequestURL(event).searchParams.get('id')
  const redisResult = await getRedisClient()
    .multi()
    .hgetall(token as string)
    .del(token as string)
    .exec()

  if (redisResult) {
    await handleRedisQuery(redisResult)
  }

  return sendRedirect(event, '/')
})

const handleRedisQuery = async (
  redisResult: [error: Error | null, result: unknown][],
) => {
  if (redisResult[0][0]) {
    throw redisResult[0][0]
  }
  const cachedAccount = redisResult[0][1] as {
    username: string
    email: string
    hashedPass: string
  }

  if (
    // !cachedAccount.email ||
    !cachedAccount.username ||
    !cachedAccount.hashedPass
  ) {
    return
  }

  await prisma.user.create({
    data: {
      username: cachedAccount.username,
      email: cachedAccount.email,
      passhash: cachedAccount.hashedPass,
    },
  })
}
