<script setup lang="ts">
import { MenuList } from '@/components/ui/menu'
import { useLogout } from './logout'
import { links } from './menu.Links'
import SwitchTheme from '../ui/switch/SwitchTheme.vue'
// const colorMode = useColorMode()
definePageMeta({
  colorMode: 'light',
})
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
      class="transition-transform duration-1000 ease-in-out flex flex-col items-start px-5 py-2 relative bg-slate-200 shadow-md shadow-inner shadow-top"
      :class="sideBarClass"
    >
      <MenuList class="flex flex-end" :links />
      <div
        class="flex justify-around shadow-md p-2 w-50 gap-2 content bg-white dark:bg-slate-800 rounded-md"
      >
        <LogoutBtn
          @click="handleLogout"
          text-class="text-sm font-semibold"
          class="text-red-500 dark:text-red-100"
        />
        <SwitchTheme />
      </div>
    </div>
  </nav>
  <slot />
</template>
