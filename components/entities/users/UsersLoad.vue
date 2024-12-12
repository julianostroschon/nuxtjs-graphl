<script lang="ts">
import {
  columns,
  headers,
  payments,
} from '~/components/ui/table/SimpleTable/columns'
import DataTable from '~/components/ui/table/SimpleTable/data-table.vue'

const columnsName = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'username',
    label: 'Nome de usuário'
  },
  {
    key: 'email',
    label: 'E-mail'
  }
]

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
      columnsName
    }
  },
})
</script>
<template>
  <div class="card rounded bg-slate-100 shadow-md w-full">    
    <DataTable :columns="columnsName" :rows="users"/>
  </div>
</template>
