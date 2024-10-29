import type { FieldResolver } from 'nexus'

import { setCookie } from 'h3'
import { getExistingUser } from '../../../domains/users/getExistingUser'
import { createToken } from '../../../utils/jwt'
import { loginValidation } from '../../../utils/registrationValidation'

export const loginAttemp: FieldResolver<'Mutation', 'login'> = async (
  _,
  { credentials },
  { prisma, logger },
) => {
  const event = useEvent()

  await loginValidation.validate(credentials)
  const loggi = logger.child({ graphql: 'mutation.login' })
  const existingUser = await getExistingUser(prisma, loggi, credentials)
  const encodedToken = await createToken(
    {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    },
    {
      expiresIn: '60m',
    },
  )

  const cookieOptions = {
    httpOnly: true,
    domain: process.env.SERVER_DOMAIN || undefined,
    maxAge: 60 * 30,
    sameSite: 'strict' as const, // ou 'lax' dependendo da sua necessidade
    path: '/',
  }

  setCookie(event, 'sid', encodedToken, cookieOptions)

  return {
    username: credentials.username,
    email: existingUser.email,
    id: existingUser.id,
    token: encodedToken,
  }
}
