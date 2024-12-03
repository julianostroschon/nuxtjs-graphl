<script lang="ts">
// import { useLogout } from './logout'
// const emits = defineEmits(['toggleSidebar'])
export default defineComponent({
  name: 'TopHeader',
  setup() {
    return {
      // emit,
    }
  },
})
</script>

<template>
  <div
    class="flex flex-row justify-between h-full bg-slate-400 dark:bg-slate-900 text-black dark:text-white p-5"
  >
    <slot name="start" />
    <slot />
    <slot name="end" class="bg-slate-900" />
  </div>
</template>
