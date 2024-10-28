import { defineNuxtPlugin } from '#app'
import { useCounterStore } from '@/stores/counter'
import { createPinia } from 'pinia'
// Importe outras stores aqui

export default defineNuxtPlugin(({ vueApp }) => {
  const pinia = createPinia()
  vueApp.use(pinia)

  // Injetando as stores no contexto global
  return {
    provide: {
      counterStore: useCounterStore(pinia),
      // Adicione outras stores aqui
    },
  }
})
