import { type Channel, type Connection, connect } from 'amqplib'

import logger from '../../api/utils/logger'

import { getContent, getUrl, queueConfig } from './lib'

export class RabbitMQProducer {
  private connection: Connection
  private channel: Channel
  private isOpen: boolean

  constructor(private readonly queue: string) {}

  async connect(): Promise<void> {
    try {
      if (this.isOpen) {
        logger.info({ queue: this.queue }, `Conexão já aberta`)
        return
      }
      this.connection = await connect(getUrl())
      this.channel = await this.connection.createChannel()

      await this.channel.assertQueue(this.queue, {
        durable: true,
      })

      const message = 'Conectado ao RabbitMQ'
      logger.info(message)
      this.isOpen = true
    } catch (error) {
      logger.error(
        { erroData: JSON.stringify(error) },
        'Falha ao conectar ao RabbitMQ:',
      )
      await this.disconnect()
    }
  }

  async publish(message: string): Promise<void> {
    try {
      if (!this.isOpen) {
        this.connection = await connect(getUrl())
        this.channel = await this.connection.createChannel()
      }
      const options = { persistent: queueConfig.RABBIT_DURABILITY }
      this.channel.sendToQueue(this.queue, getContent(message), options)
      logger.info(
        { event: JSON.parse(message) },
        `Evento enviado à fila ${this.queue}`,
      )
    } catch (error) {
      logger.error(
        { errorData: JSON.stringify(error) },
        `Falha ao publicar mensagem na fila ${this.queue}:`,
      )
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.isOpen) {
        await this.connection.close()
        await this.channel.close()
      }
      this.isOpen = false
    } catch (error) {
      console.error(
        { errorData: JSON.stringify(error) },
        'Falha ao desconectar do RabbitMQ:',
      )
    }
  }
}
