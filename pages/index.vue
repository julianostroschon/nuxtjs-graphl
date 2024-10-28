<script setup lang="ts">
// useGqlCors({ credentials: 'same-origin' })
import { Button } from '@/components/ui/button'

const data = await GqlPing()
</script>

<template>
  <div>Template</div>
  <div>{{ data.ping }}</div>
  <div class="p-4">
    <Button class="rounded-lg">Click me</Button>
  </div>
  <div class="flex flex-col gap-4 p-4">
    <p>Count: {{ $counterStore.count }}</p>
    <Button class="rounded-lg" @click="$counterStore.increment">
      Increment
    </Button>
  </div>
</template>
