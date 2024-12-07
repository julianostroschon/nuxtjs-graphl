<script lang="ts">
import {
  columns,
  headers,
  payments,
} from '~/components/ui/table/SimpleTable/columns'
import DataTable from '~/components/ui/table/SimpleTable/data-table.vue'

// import { SimpleTable } from '~/components/ui/table'
interface UserResponse {
  id: number
  username: string
}
export default defineComponent({
  components: { DataTable },
  async setup() {
    const users = ref<UserResponse[]>([])
    onMounted(async () => {
      const data = await GqlGetUsers()
      const result = data?.getUsers
      if (result && result.nodes) {
        users.value = result.nodes
        return
      }
      users.value = []
    })
    return {
      payments,
      columns,
      headers,
      users,
    }
  },
})
</script>
<template>
  <div class="card rounded bg-slate-100 shadow-md w-full">
    <!-- <div
      id="products"
      v-for="{ id, username } in users"
      :key="id"
      class="w-full flex flex-col items-center justify-center p-4"
    >
      <div class="card rounded bg-slate-500 shadow-md w-full p-4">
        <div class="card-body">
          <h2 class="card-title text-center">{{ id }} {{ username }}</h2>
        </div>
      </div>
    </div> -->

    <!-- <template #prepend="{ table }">
        <Input
          class="max-w-sm"
          placeholder="Filter emails..."
          :model-value="table.getColumn('email')?.getFilterValue() as string"
          @update:model-value="table.getColumn('email')?.setFilterValue($event)"
        />
      </template> -->
    columns:<br />
    {{ users }}<br />
    {{ payments }}
    <hr />
    headers:<br />
    {{ headers }}
    <hr />
    {{ columns }}
    <DataTable :columns :data="payments" />
    <DataTable :columns="headers" :data="users">
      <template #prepend="{ table }">
        <Input
          class="max-w-sm"
          placeholder="Filter emails..."
          :model-value="table.getColumn('email')?.getFilterValue() as string"
          @update:model-value="table.getColumn('email')?.setFilterValue($event)"
        />
      </template>
    </DataTable>
  </div>
</template>
