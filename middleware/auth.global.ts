import { useAuthStore } from '@/stores/authStore'

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore()
  const token = useCookie('authToken').value

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
  }
})
