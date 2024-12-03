<script lang="ts">
export default defineComponent({
  name: 'UserIndex',

  async setup() {
    const data = await GqlGetUsers()
    definePageMeta({
      layout: 'default',
    })
    return {
      name: 'UserIndex',
      data,
    }
  },
})
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <div class="card rounded bg-slate-100 shadow-md w-full">
      {{ data.getUsers }}
      <div
        id="products"
        v-for="user in data.getUsers"
        :key="user.id"
        class="w-full flex flex-col items-center justify-center p-4"
      >
        oito
        <div class="card rounded bg-slate-500 shadow-md w-full p-4">
          <div class="card-body">
            <h2 class="card-title text-center">
              {{ user.name }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
