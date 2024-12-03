<script setup lang="ts">
const data = await GqlProductLoad()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full bg-slate-100 mx-10"
  >
    <h1 class="text-1xl font-bold py-4">
      {{ $t('sidebar.products') }}
    </h1>

    <div class="card rounded bg-slate-200 shadow-md w-full">
      {{ data.products }}
      <div
        id="products"
        v-for="product in data.products"
        :key="product.id"
        class="w-full flex flex-col items-center justify-center p-4"
      >
        oito
        <div class="card rounded bg-slate-500 shadow-md w-full p-4">
          <div class="card-body">
            <h2 class="card-title text-center">
              {{ product.name }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
