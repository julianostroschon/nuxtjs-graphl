<script setup lang="ts">
import { name, version } from '@/utils/constants'
</script>
<template>
  <footer class="absolute bottom-0 left-0 w-full bg-slate-900 text-slate-100">
    <div class="flex flex-row justify-between items-center p-2">
      <div class="flex flex-row gap-2">
        <img
          class="h-7 transition-opacity duration-300 ease-in-out"
          :src="`/images/${name}-elemento.png`"
          alt="Logo"
        />
        <span
          class="text-sm font-bold h7 text-slate-100 pt-1 outline-4 outline-black"
          >{{ name.toLocaleUpperCase() }}</span
        >
      </div>
      <span
        class="text-sm font-bold text-xs text-slate-400 pt-1 outline-4 outline-black"
        >v{{ version }}</span
      >
      <!-- </div> -->
    </div>
  </footer>
</template>
