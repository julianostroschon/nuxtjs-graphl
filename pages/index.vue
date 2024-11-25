<script setup lang="ts">
// useGqlCors({ credentials: 'same-origin' })
import { Button } from '@/components/ui/button'
const { data } = await useAsyncGql('Ping')

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="outline-4 outline-black hover:border-b-2">Template</div>
  <div>{{ data.ping }}</div>
  <div class="p-4">
    <Button class="rounded-lg" :to="`user`">Click me</Button>
  </div>
</template>
