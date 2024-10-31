import { PrismaClient } from '@prisma/client'

export function createPrismaClient(datasource: string): PrismaClient {
  const databaseUrl = process.env[`DATABASE_URL_${datasource.toUpperCase()}`]
  console.log('databaseUrl', databaseUrl)
  if (!databaseUrl) {
    throw new Error(`Database URL for datasource ${datasource} not found.`)
  }
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })
}
