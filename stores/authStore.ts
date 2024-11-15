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
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
    },
    clearAuth() {
      this.user = null
      this.token = null
    },
  },
})
