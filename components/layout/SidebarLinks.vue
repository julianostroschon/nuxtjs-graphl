<script setup lang="ts">
interface LinkProp {
  to: string
  icon: string
  text: string
}

const props = defineProps<{
  links: LinkProp[]
  isCollapsed: boolean
}>()
const { t } = useI18n()
</script>

<template>
  <RouterLink
    v-for="(link, index) in props.links"
    :key="index"
    :to="link.to"
    class="flex items-center gap-3 mx-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out"
  >
    <Icon :name="link.icon"></Icon>
    <span
      class="text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ease-in-out"
      :class="props.isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
    >
      {{ t(link.text) }}
    </span>
  </RouterLink>
</template>

<style scoped>
@media (max-width: 768px) {
  .text-sm {
    display: none;
  }
}
</style>
