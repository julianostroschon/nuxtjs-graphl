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
    authUserCookie: () => useCookie('authUser'),
    authTokenCookie: () => useCookie('authToken'),
  },
  actions: {
    setUser(user: User) {
      this.user = user
      this.authUserCookie.value = JSON.stringify(user)
    },
    setToken(token: string) {
      this.token = token
      this.authTokenCookie.value = token
    },
    clearAuth() {
      this.user = null
      this.token = null
      this.authUserCookie.value = null
      this.authTokenCookie.value = null
    },
    initializeAuth() {
      if (this.authTokenCookie.value) {
        this.token = this.authTokenCookie.value
      }

      if (this.authUserCookie.value) {
        this.user = JSON.parse(this.authUserCookie.value)
      }
    },
  },
})
