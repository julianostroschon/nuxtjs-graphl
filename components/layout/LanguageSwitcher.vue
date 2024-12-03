<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  size?: string
}

const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
const props = withDefaults(defineProps<Props>(), {
  size: '6',
})

async function toggleLanguage() {
  const newLocale = currentLocale.value === 'en' ? 'pt-BR' : 'en'
  await setLocale(newLocale)
  localStorage.setItem('userLocale', newLocale)
}

onMounted(() => {
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale) {
    setLocale(savedLocale)
  }
})
</script>

<template>
  <div @click="toggleLanguage" class="flex items-center">
    <Icon
      :name="
        currentLocale === 'en'
          ? 'twemoji:flag-for-flag-united-states'
          : 'twemoji:flag-for-flag-brazil'
      "
      class="m-0 p-0"
      :class="`w-${props.size} h-${props.size}`"
    />
  </div>
</template>
