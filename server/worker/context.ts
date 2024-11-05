import { Logger } from 'pino'

export async function buildContext(
  controller: AbortController,
  logger: Logger,
): Promise<(datasource: string) => Promise<Context>> {
  controller.signal.onabort = async () => {
    logger.debug('Aborted signal received, destroying database connections')

    // for (const [datasource, conn] of localCache) {
    //   await Promise.all([conn.database.$disconnect()])
    // }
  }

  return async () => {
    return {
      // database: ,
      logger,
    }
  }
}
