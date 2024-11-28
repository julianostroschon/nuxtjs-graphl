/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { PrismaClient } from '@prisma/client'
import { seedProducts } from './products'
import { seedUsers } from './users'
;(async () => {
  const prisma = new PrismaClient()

  await seedUsers(prisma)
  await seedProducts(prisma)

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('🌱 Database seeded successfully!')

  process.exit()
})()
