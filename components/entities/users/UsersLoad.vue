<script lang="ts">
interface UserResponse {
  id: number
  username: string
}
export default defineComponent({
  async setup() {
    const users = ref<UserResponse[]>([])
    onMounted(async () => {
      const { data } = await useAsyncGql('GetUsers')
      console.log({ data })
      const result = data?.value.getUsers
      if (result && result.nodes) {
        users.value = result.nodes
      }
      users.value = []
    })
    return {
      users,
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
  </div>
</template>
