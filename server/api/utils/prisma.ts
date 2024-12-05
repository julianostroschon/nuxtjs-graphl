import { PrismaClient } from '@prisma/client'

// const prismaClients: Record<string, PrismaClient> = {}

export function getPrismaClient(datasource: string) {
  // const formattedDatasource = datasource.replace(/-/g, '_')
  const databaseUrl = process.env[`DATABASE_URL`]
  // console.log('databaseUrl', databaseUrl)
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
  // }
  // return prismaClients[datasource]
}
