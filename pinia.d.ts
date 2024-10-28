import { useCounterStore } from '~/stores/counter'

declare module '#app' {
  interface NuxtApp {
    $counterStore: ReturnType<typeof useCounterStore>
    // Adicione outras stores aqui
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $counterStore: ReturnType<typeof useCounterStore>
    // Adicione outras stores aqui
  }
}

export {}
