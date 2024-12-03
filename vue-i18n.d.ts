import '@vue/runtime-core'
import type { Composer } from 'vue-i18n'

declare module '#app' {
  interface NuxtApp {
    $i18n: Composer
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: Composer
  }
}

export {}
