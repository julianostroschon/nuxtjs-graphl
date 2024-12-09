<script lang="ts">
// const data = await GqlProductLoad()
// const products = computed(() => data?.products)

export default defineComponent({
  // components: { DataTable },
  async setup() {
    const products = ref([])
    onMounted(async () => {
      const data = await GqlProductLoad()
      const result = data?.products
      if (result) {
        products.value = result
        return
      }
    })
    return {
      products,
    }
  },
})
</script>
<template>
  <div class="card rounded bg-slate-200 shadow-md w-full" v-if="products">
    <div
      id="products"
      v-for="{ id, name, price, stock } in products"
      :key="id"
      class="w-1/3 flex items-center justify-center p-4"
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
</template>
