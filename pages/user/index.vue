<script lang="ts">
export default defineComponent({
  name: 'UserIndex',

  setup() {
    definePageMeta({
      layout: 'default',
    })
    return {
      name: 'UserIndex',
    }
  },
})
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
