<script lang="ts" setup>
defineProps<{
  side?: 'top' | 'right' | 'bottom' | 'left'
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipContent :side="side">
        <slot />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
