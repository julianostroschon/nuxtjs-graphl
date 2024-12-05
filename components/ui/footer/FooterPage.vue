<script setup lang="ts">
defineProps({
  isCollapsed: {
    type: Boolean,
    default: () => false,
  },
})
</script>
<template>
  <div class="flex flex-col justify-between items-center">
    <div v-if="!isCollapsed" class="flex flex-col">
      <img
        v-if="name && showLogo"
        class="h-8 w-8 transition-opacity duration-300 ease-in-out"
        :src="`/images/${name}-elemento.png`"
        alt="Logo"
      />
      <span class="text-xs font-bold h7 text-slate-700">{{
        name.toLocaleUpperCase()
      }}</span>
    </div>
    <span class="text-xs text-slate-400">v{{ version }}</span>
  </div>
</template>
