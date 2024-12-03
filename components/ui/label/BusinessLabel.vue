<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <div class="flex flex-row gap-2 p-1">
    <img
      class="h-7 transition-opacity duration-300 ease-in-out"
      :src="`/images/${name}-elemento.png`"
      alt="Logo"
    />
    <span
      class="text-sm font-bold h7 text-slate-900 pt-1 outline-4 outline-black"
      >{{ name.toLocaleUpperCase() }}</span
    >
  </div>
</template>
