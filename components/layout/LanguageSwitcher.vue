<template>
  <Icon @click="toggleLanguage" :name />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { locale, setLocale } = useI18n()
const currentLanguage = ref(locale.value)

const name = computed(() =>
  currentLanguage.value === 'en'
    ? 'twemoji:flag-for-flag-united-states'
    : 'twemoji:flag-for-flag-brazil',
)

async function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'pt-BR' : 'en'
  setLocale(currentLanguage.value)
}
</script>
