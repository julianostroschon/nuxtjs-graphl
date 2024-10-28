<script setup lang="ts">
// useGqlCors({ credentials: 'same-origin' })

const data = await GqlPing();
</script>

<template>
  <div>Template</div>
  <div>{{ data.ping }}</div>
</template>
