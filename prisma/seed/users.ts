import type { PrismaClient } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'

const basePassword = '1234567890x1'
const adminEmail = 'demo@demo.com'
const moderatorEmail = 'mod@demo.com'

export async function seedUsers(prisma: PrismaClient) {
  const salt = await genSalt(Number(process.env.BCRYPT_SALT) || 10)
  const passhash = await hash(basePassword, salt)

  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      username: 'Admin',
      email: adminEmail,
      passhash,
    },
  })
  await prisma.user.create({
    data: {
      email: moderatorEmail,
      username: 'Moderator',
      passhash,
    },
  })

  return await prisma.user.findMany()
}
