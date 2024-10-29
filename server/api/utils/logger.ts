import pino from 'pino'

const logger = pino({
  transport: {
    target: process.env.NODE_ENV === 'production' ? 'pino-pretty' : 'pino/file',
    options: {
      colorize: process.env.NODE_ENV !== 'production',
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      levelFirst: true,
      messageFormat: '{msg}',
    },
  },
  level: process.env.LOG_LEVEL || 'info',
})

export default logger
