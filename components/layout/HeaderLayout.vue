<script setup lang="ts">
import { MenuList } from '@/components/ui/menu'
import { useLogout } from './logout'
import { links } from './menu.Links'

const { handleLogout } = useLogout()

const isSidebarCollapsed = ref<boolean>(true)

function handleToggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const sideBarClass = computed<'hidden' | 'block'>(() =>
  !!isSidebarCollapsed.value ? 'hidden' : 'block',
)
</script>

<template>
  <nav
    class="flex-col justify-start items-center gaps-4 bg-muted/40 border-b-2"
  >
    <div class="w-full flex justify-between items-center p-2">
      <MenuBtn :isSidebarCollapsed @toggleSidebar="handleToggleSidebar" />
      <BusinessLabel class="p-1/5" />
      <LanguageSwitcher class="w-5 h-5 p-5" />
    </div>
    <div
      class="transition-transform duration-1000 ease-in-out flex flex-col border-b-2"
      :class="sideBarClass"
    >
      <MenuList :links />
      <LogoutBtn
        @click="handleLogout"
        text-class="text-sm font-semibold"
        class="text-red-500"
      />
    </div>
  </nav>
  <slot />
</template>
