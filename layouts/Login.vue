<script setup lang="ts"></script>

<template>
  <main
    class="flex md:flex-row flex-col w-full min-h-screen transition-all duration-300 ease-in-out"
  >
    <div
      class="relative w-full md:w-1/2 h-64 md:h-auto transition-all duration-300 overflow-hidden ease-in-out"
    >
      <img
        src="/images/login.jpeg"
        alt="login"
        class="w-full h-full transition-all duration-300 ease-in-out object-cover"
      />
    </div>
    <section
      class="flex flex-col justify-start md:justify-center items-center bg-background p-8 w-full md:w-1/2 min-h-[calc(100vh-16rem)] md:min-h-screen transition-all duration-300 ease-in-out"
    >
      <div class="w-full max-w-md transition-all duration-300 ease-in-out">
        <img
          class="mx-auto mb-8 transition-all duration-300 ease-in-out"
          src="/images/logo-tcheplanner.png"
          alt="Logo"
        />
        <slot />
      </div>
    </section>
  </main>
</template>

<style scoped>
@media (min-width: 768px) {
  .flex-col {
    transition: flex-direction 0.3s ease-in-out;
  }
}
</style>
