<script setup lang="ts">
const data = await GqlProductLoad()
</script>
<template>
  <div class="card rounded bg-slate-200 shadow-md w-full">
    <div
      id="products"
      v-for="product in data.products"
      :key="product.id"
      class="w-full flex flex-col items-center justify-center p-4"
    >
      <div class="card rounded bg-slate-500 shadow-md w-full p-4">
        <div class="card-body">
          <h2 class="card-title text-center">
            {{ product.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
