<script setup lang="ts">
interface Props {
  loading: boolean
  type?: 'submit' | 'button' | 'reset'
  loadingText?: string
  text: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  loadingText: '',
  variant: 'default',
})
</script>

<template>
  <Button
    :variant
    :type
    :loading="loading"
    :class="[
      'transition-colors',
      loading
        ? 'bg-gray-300 hover:bg-gray-300 text-gray-600'
        : 'bg-primary hover:bg-primary/90',
    ]"
  >
    <Icon
      v-if="loading"
      name="lucide:loader-circle"
      class="mr-2 w-6 h-6 text-slate-800 animate-spin"
    />
    <span>{{ loading ? props.loadingText : props.text }}</span>
  </Button>
</template>
