import { PrismaClient } from '@prisma/client'

// const prismaClients: Record<string, PrismaClient> = {}

export function getPrismaClient(_datasource?: string): PrismaClient {
  const databaseUrl = process.env[`DATABASE_URL`]
  // if (datasource) {
  //   const prismaClients: Record<string, PrismaClient> = {}
  //   const formattedDatasource = datasource.replace(/-/g, '_')
  //   if (!databaseUrl) {
  //     throw new Error(`Database URL for datasource ${datasource} not found.`)
  //   }
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })
  // }
  // }
  // return prismaClients[datasource]
}
