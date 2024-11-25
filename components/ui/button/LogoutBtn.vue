<template>
  <button class="flex items-center gap-2">
    <Icon name="lucide:log-out" />
    <span :class="props.textClass">{{ $t('auth.logout') }}</span>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  textClass?: string
}>()
</script>
