/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { PrismaClient } from '@prisma/client'
import { createSeedClient } from '@snaplet/seed'
import { genSalt, hash } from 'bcrypt'

const basePassword = '1234567890x1'
const adminEmail = 'demo@demo.com'
const moderatorEmail = 'mod@demo.com'

// const genHash = async () =>
//   await hash(basePassword, process.env.BCRYPT_SALT || 10)

const main = async () => {
  const seed = await createSeedClient()
  const prisma = new PrismaClient()
  const salt = await genSalt(Number(process.env.BCRYPT_SALT) || 10)
  const passhash = await hash(basePassword, salt)

  // Truncate all tables in the database
  await seed.$resetDatabase()

  // Seed the database with 10 user
  // await seed.user(x => {
  //   return x(2)
  // })

  await prisma.user.create({
    data: {
      username: 'Admin',
      email: adminEmail,
      passhash,
    },
    // },
  })
  await prisma.user.create({
    data: {
      email: moderatorEmail,
      username: 'Moderator',
      passhash,
    },
  })
  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!')

  process.exit()
}
