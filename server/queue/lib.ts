import type { ConsumeMessage } from 'amqplib'

export function getEvent(req: ConsumeMessage | null): ConsumeMessage {
  if (!req) {
    throw new Error('Message is null')
  }
  const body = req.content.toString()
  return parseJSON<ConsumeMessage>(body)
}

function parseJSON<Response = unknown>(string?: string): Response {
  if (typeof string !== 'string') {
    throw new Error('Value different than string cannot be parsed to JSON')
  }

  return JSON.parse(string)
}
