// import { defineComponent } from 'vue';

export function useLogout() {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    authStore.clearAuth()
    setTimeout(() => {
      router.push('/login')
    }, 100)
  }

  return { handleLogout }
}
