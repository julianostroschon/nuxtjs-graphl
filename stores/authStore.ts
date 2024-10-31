import { defineStore } from 'pinia'

interface User {
  username: string
  email?: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  getters: {
    authTokenCookie: () =>
      useCookie('authToken', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      }),
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
      this.authTokenCookie.value = token
    },
    clearAuth() {
      this.user = null
      this.token = null
      this.authTokenCookie.value = null
    },
    initializeAuth() {
      if (this.authTokenCookie.value) {
        this.token = this.authTokenCookie.value
      }
    },
  },
})
