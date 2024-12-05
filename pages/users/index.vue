<script lang="ts">
export default defineComponent({
  name: 'UserIndex',

  async setup() {
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
    <div class="card rounded bg-slate-100 shadow-md w-full">
      <UsersLoad />
      <!-- <DataTable :columns="columns" :data="payments" /> -->
    </div>
  </div>
</template>
