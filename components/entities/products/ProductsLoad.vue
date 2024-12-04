<script setup lang="ts">
// const { data, error } = await useAsyncData('users', await GqlProductLoad())
const data = await GqlProductLoad()
const products = computed(() => data?.products)
console.log({ data, products })
</script>
<template>
  <div class="card rounded bg-slate-200 shadow-md w-full" v-if="products">
    <div
      id="products"
      v-for="{ id, name, price, stock } in products"
      :key="id"
      class="w-full flex flex-col items-center justify-center p-4"
    >
      <div class="card rounded bg-slate-500 shadow-md w-full p-4">
        <div class="card-body">
          <h2 class="card-title text-center">
            {{ name }}
          </h2>
        </div>
        <div class="card-footer text-center">
          <p class="card-text">price: {{ price }}</p>
          <p class="card-text">stock: {{ stock }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Error: {{ error }}</div>
  oito
</template>
