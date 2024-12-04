<script setup lang="ts">
const props = defineProps<{
  isSidebarCollapsed: boolean
}>()
const emits = defineEmits(['toggleSidebar'])

function handleToggleSidebar() {
  emits('toggleSidebar')
}
</script>
<template>
  <button
    @click="handleToggleSidebar"
    variant="outline"
    size="icon"
    class="md:block hiddens w-8 h-8 transition-transform duration-300 ease-in-out top-2 left-2"
    :class="{ 'rotate-120': props.isSidebarCollapsed }"
  >
    <Icon name="lucide:menu" />
  </button>
</template>
