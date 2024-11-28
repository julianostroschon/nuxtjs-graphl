<script setup lang="ts">
import { MenuList } from '@/components/ui/menu'
import { FooterPage } from '@/components/ui/footer'
import { useLogout } from './logout'
import { links } from './menu.Links'
const { handleLogout } = useLogout()

const router = useRouter()
const title = computed(() => router.currentRoute.value.fullPath.slice(1))

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
      <BusinessLabel :name class="p-1/5 flex-5" />
      <span class="shrink-0 text-slate-400 text-sm font-bold">{{ title }}</span>
      <MenuBtn :isSidebarCollapsed @toggleSidebar="handleToggleSidebar" />
    </div>
    <div
      class="flex justify-between items-center px-5 py-2 relative bg-slate-200 shadow-md shadow-inner shadow-top"
      :class="sideBarClass"
    >
      <div class="flex flex-col">
        <MenuList class="" :links />
      </div>
      <div
        class="flex flex-col items-center shadow-md p-3 w-50 content bg-white rounded-md"
      >
        <Icon name="lucide:user" class="w-6 h-6 pb-10 text-slate-400" />
        <div class="flex flex-row gap-5">
          <LanguageSwitcher class="w-3 p-3" />
          <LogoutBtn
            @click="handleLogout"
            text-class="text-sm font-semibold"
            class="text-red-500 dark:text-red-100"
          />
        </div>
      </div>
    </div>
  </nav>
  <div class="w-full flex flex-row justify-center">
    <slot />
  </div>
  <FooterPage />
</template>
