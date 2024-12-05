<script lang="ts">
import { columns, payments } from '~/components/ui/table/SimpleTable/columns'
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
      users,
      columns,
      payments,
    }
  },
})
</script>
<template>
  <div class="card rounded bg-slate-100 shadow-md w-full">
    <div
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
    </div>
    <DataTable :columns="columns" :data="payments" />
    {{ columns }}
  </div>
</template>
