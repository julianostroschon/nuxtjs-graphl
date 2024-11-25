<template>
  <div>
    <header>
      <nav
        class="flex items-center justify-between p-4 bg-slate-900 text-slate-100"
      >
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/user">User</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; 2023 Your Company Name</p>
    </footer>
  </div>
</template>
