<script setup lang="ts">
import { alertVariants } from '@/components/ui/alert'
import { type Component } from 'vue'

interface Props {
  title: string
  message: string
  icon?: Component
  type?: 'default' | 'destructive'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  icon: undefined,
})

const alertClass = computed(() => {
  return alertVariants({ variant: props.type })
})
</script>

<template>
  <Alert :class="alertClass">
    <component :is="icon" class="w-4 h-4" v-if="icon" />
    <AlertTitle>{{ title }}</AlertTitle>
    <AlertDescription>
      {{ message }}
    </AlertDescription>
  </Alert>
</template>
