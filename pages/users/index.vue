<script lang="ts">
import { columns, payments } from '~/components/ui/table/SimpleTable/columns'

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
    <h1>{{ name }}</h1>
    <div class="card rounded bg-slate-100 shadow-md w-full">
      <UsersLoad />
      <DataTable :columns="columns" :data="payments" />
    </div>
  </div>
</template>
