<template>
  <div
    v-for="{ to, icon: name, text } in links"
    :key="to"
    class="hover:ring-1 ring-offset-1 ring-slate-400"
  >
    <RouterLink :to class="flex items-center gap-2">
      <Icon :name />
      <span class="text-sm">{{ $t(text) }}</span>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
const { links } = defineProps<{
  links: Array<{
    to: string
    icon: string
    text: string
  }>
}>()
</script>
