<template>
  <button @click="toggleLanguage">
    <Icon
      :name="
        currentLanguage === 'en'
          ? 'twemoji:flag-for-flag-united-states'
          : 'twemoji:flag-for-flag-brazil'
      "
      class="w-10 h-10"
    />
  </button>
</template>

<script setup lang="ts">
// import { loadLanguageAsync } from '@/modules/i18n'
import { ref } from 'vue'

const { locale } = useI18n()
const currentLanguage = ref(locale.value)

async function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'pt-BR' : 'en'
  // await loadLanguageAsync(currentLanguage.value)
}
</script>
