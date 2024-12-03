<script lang="ts">
export default defineComponent({
  name: 'UserIndex',

  async setup() {
    const data = await GqlGetUsers()
    const users = computed(() => {
      const result = data?.getUsers
      if (result && result.nodes) {
        return result.nodes
      }
      return []
    })
    definePageMeta({
      layout: 'default',
    })
    return {
      name: 'UserIndex',
      users,
    }
  },
})
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
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
  </div>
</template>
