<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center justify-center w-full bg-slate-100">
    <h1 class="text-1xl font-bold">
      {{ $t('sidebar.products') }}
    </h1>
    <ProductsLoad />
  </div>
</template>
