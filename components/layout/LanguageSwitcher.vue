<template>
  <button @click="toggleLanguage">
    <Icon
      :name="
        currentLocale === 'en'
          ? 'twemoji:flag-for-flag-united-states'
          : 'twemoji:flag-for-flag-brazil'
      "
      class="w-8 h-8"
    />
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)

async function toggleLanguage() {
  const newLocale = currentLocale.value === 'en' ? 'pt-BR' : 'en'
  await setLocale(newLocale)
}
</script>
