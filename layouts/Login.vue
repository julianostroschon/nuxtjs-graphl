<template>
  <div class="login-layout">
    <main>
      <h1>Login</h1>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// You can add any necessary imports or logic here
</script>

<style scoped>
.login-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>