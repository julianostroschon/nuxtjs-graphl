<script setup lang="ts">
import { LogoutBtn, MenuBtn } from '@/components/ui/button'
import { useLogout } from './logout'
import { links } from './menu.Links'
import { MenuList } from '@/components/ui/menu'
import { BusinessLabel } from '@/components/ui/label'
// const emits = defineEmits(['toggleSidebar'])

const { handleLogout } = useLogout()

const isSidebarCollapsed = ref(true)

function handleToggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  // emits('toggleSidebar')
}
</script>

<template>
  <nav class="flex justify-start items-center gap-4 bg-muted/40 p-6 border-b-2">
    <div class="flex justify-between items-center top-1 absolute left-2">
      <MenuBtn :isSidebarCollapsed @toggleSidebar="handleToggleSidebar" />
      <BusinessLabel class="p-1/5" />
    </div>
    <div
      :class="!!isSidebarCollapsed ? 'hidden' : 'block'"
      class="transition-transform duration-1000 ease-in-out flex flex-col pt-4"
    >
      <MenuList :links />
      <LogoutBtn
        @click="handleLogout"
        text-class="text-sm font-semibold"
        class="text-red-500"
      />
    </div>
    <LanguageSwitcher />
  </nav>
  <slot />
</template>
