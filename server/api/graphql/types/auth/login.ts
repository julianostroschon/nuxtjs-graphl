import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

import { createAccount } from '../../resolvers/auth/createAccount'
import { implicitLogin } from '../../resolvers/auth/implicitLogin'
import { loginAttemp } from '../../resolvers/auth/loginAttemp'

export const ImplicitLogin = extendType({
  type: 'Query',
  definition: t => {
    t.field('implicitLogin', {
      type: ImplicitLoginResponse,
      resolve: implicitLogin,
    })
  },
})

export const CreateAccount = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('createAccount', {
      type: RegisterResponse,
      args: { credentials: nonNull(Credentials) },
      resolve: createAccount,
    })
  },
})

export const Login = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      type: LoginResponse,
      args: { credentials: nonNull(loginCredentials) },
      resolve: loginAttemp,
    })
  },
})

export const ImplicitLoginResponse = objectType({
  name: 'implicitLoginResponse',
  definition: t => {
    t.nonNull.boolean('loggedIn')
    t.string('username')
    t.string('email')
    t.string('id')
  },
})

export const LoginResponse = objectType({
  name: 'loginResponse',
  definition: t => {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.int('id')
    t.nonNull.string('token')
  },
})

export const loginCredentials = inputObjectType({
  name: 'loginCredentials',
  definition: t => {
    t.nonNull.string('username')
    t.nonNull.string('password')
  },
})

export const Credentials = inputObjectType({
  name: 'credentials',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('username')
    t.nonNull.string('password')
  },
})

export const RegisterResponse = objectType({
  name: 'registerResponse',
  definition: t => {
    t.nonNull.string('message')
  },
})
