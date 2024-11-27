<script setup lang="ts">
const colorMode = useColorMode()

function switchTheme() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>
<template>
  <!-- <div
    @click="switchTheme"
    class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-3"
  >
    <Icon
      name="heroicons-outline:sun"
      v-if="colorMode.preference === 'dark'"
      class="text-yellow-100 bg-yellow-900"
    />
    <Icon
      name="heroicons-outline:moon"
      v-else
      class="text-sky-500 bg-blue-900"
    />
  </div> -->
  <select v-model="$colorMode.preference">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="sepia">Sepia</option>
  </select>
</template>
<style scoped>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
