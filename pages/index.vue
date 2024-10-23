<script setup lang="ts">
const data = await GqlPing();
</script>

<template>
  <div>Template</div>
  <div>{{ data.ping }}</div>
</template>
