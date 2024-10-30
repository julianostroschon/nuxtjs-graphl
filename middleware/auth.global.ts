import { useAuthStore } from '@/stores/authStore'

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore()
  const token = useCookie('authToken').value
  const user = useCookie('authUser').value

  // Define public routes
  const publicRoutes = ['/login', '/register']

  // Check if the current route is public
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Redirect to login if no token is found
  if (!token) {
    return navigateTo('/login')
  }

  // Persist authStore state from cookies
  if (token && !authStore.token) {
    authStore.setToken(token)

    if (user) {
      try {
        // Tenta fazer o parse do user como JSON
        const parsedUser = typeof user === 'string' ? JSON.parse(user) : user
        authStore.setUser(parsedUser)
      } catch (e) {
        console.error('Failed to parse authUser cookie:', e)
        // Se falhar, tenta usar o valor do cookie diretamente
        if (typeof user === 'object' && user !== null) {
          authStore.setUser(user)
        } else {
          console.warn('Invalid user data in cookie, setting default user')
          authStore.setUser({ username: '' })
        }
      }
    } else {
      console.warn('No user data found in cookie, setting default user')
      authStore.setUser({ username: '' })
    }
  }
})
