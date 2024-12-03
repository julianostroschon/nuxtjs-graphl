<script setup lang="ts">
const isSidebarCollapsed = ref(false)

function handleCollapseUpdate(value: boolean) {
  isSidebarCollapsed.value = value
}

function handleToggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <Sidebar
    :isSidebarCollapsed="isSidebarCollapsed"
    @update:isSidebarCollapsed="handleCollapseUpdate"
  />
  <div
    :class="[
      'flex flex-col transition-[margin] duration-300 ease-in-out',
      isSidebarCollapsed ? 'ml-16' : 'md:ml-48',
    ]"
  >
    <HeaderLayout :isSidebarCollapsed @toggleSidebar="handleToggleSidebar" />
    <main class="pt-2 pl-4">
      <slot />
    </main>
  </div>
</template>
