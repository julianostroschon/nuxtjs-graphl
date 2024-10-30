<script setup lang="ts">
const isCollapsed = ref(false)

function handleCollapseUpdate(value: boolean) {
  isCollapsed.value = value
}

function handleToggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <Sidebar
    :isSidebarCollapsed="isCollapsed"
    @update:isCollapsed="handleCollapseUpdate"
  />
  <div
    :class="[
      'flex flex-col transition-[margin] duration-300 ease-in-out',
      isCollapsed ? 'ml-16' : 'md:ml-48',
    ]"
  >
    <HeaderLayout
      :isSidebarCollapsed="isCollapsed"
      @toggleSidebar="handleToggleSidebar"
    />
    <main class="pt-2 pl-4">
      <slot />
    </main>
  </div>
</template>
