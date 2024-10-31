import { hash } from 'bcrypt'
import type { FieldResolver } from 'nexus'
import nodemailer from 'nodemailer'

import { getTransport } from '../../../mail/transport'
import { generateVerificationEmail } from '../../../mail/verifyAccount'
import { getRedisClient } from '../../../utils/redis'
import { registrationValidation } from '../../../utils/registrationValidation'

import { GraphQLError } from 'graphql'
import { nanoid } from 'nanoid'
import { verifyExistingUser } from '~/server/api/domains/users/verifyExistUser'

export const createAccount: FieldResolver<'Mutation', 'createAccount'> = async (
  _,
  { credentials },
  { prisma, logger },
) => {
  const log = logger.child({ graphql: 'mutation.createAccount' })

  await registrationValidation.validate(credentials)
  const user = await verifyExistingUser(prisma, log, credentials)
  if (user) {
    log.error('User already exists')
    throw new GraphQLError('auth.user.exists')
  }
  const hashedPass = await hash(credentials.password, 9)
  const key = nanoid()

  const userObjt = {
    username: credentials.username,
    email: credentials.email,
    hashedPass,
  }

  await getRedisClient()
    .multi()
    .hmset(key, userObjt)
    .expire(key, 60 * 60 * 24)
    .exec()

  const mailOptions = {
    username: credentials.username,
    email: credentials.email,
    uuid: key,
  }

  const transport = await getTransport()
  transport.sendMail(generateVerificationEmail(mailOptions)).then(info => {
    console.log(`Message id: ${info.messageId}`)
    console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
  log.info(`Solicitação de registro para ${credentials.username} enviada`)

  return {
    message:
      'Thanks for registering! Check your email for instructions on how to verify your account.',
  }
}
