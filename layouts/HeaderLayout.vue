<script setup lang="ts">
// import { useLogout } from './logout'
// const emits = defineEmits(['toggleSidebar'])
</script>

<template>
  <nav class="flex flex-col flex-1 h-full">
    <div class="flex flex-col flex-1 h-full">
      header
      <slot />
    </div>
  </nav>
</template>
