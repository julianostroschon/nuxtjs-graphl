<script setup lang="ts">
import { MenuList } from '@/components/ui/menu'
import { FooterPage } from '@/components/ui/footer'
import { useLogout } from './logout'
import { links } from './menu.Links'
const { handleLogout } = useLogout()
const { t, locale } = useI18n()
const isSidebarCollapsed = ref(true)
const currentLanguage = ref(locale.value)

function handleToggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const name = computed(() =>
  currentLanguage.value === 'en'
    ? 'twemoji:flag-for-flag-united-states'
    : 'twemoji:flag-for-flag-brazil',
)

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
      <span class="shrink-0 text-slate-400 text-sm font-bold">{{
        'title'
      }}</span>
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
    <button
      @click="handleToggleSidebar"
      variant="outline"
      size="icon"
      class="md:block hidden w-8 h-8 transition-transform duration-300 ease-in-out"
      :class="{ 'rotate-180': isSidebarCollapsed }"
    >
      <Icon name="lucide:menu"></Icon>
    </button>
    <div class="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            class="h-7 transition-opacity duration-300 ease-in-out"
            src="/images/tcheplanner-elemento.png"
            alt="Logo"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel class="flex flex-row items-center gap-3">
            <span>Tcheplanner</span>
            <!-- <LanguageSwitcher size="4" /> -->
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div v-for="link in links" :key="link.to">
            <DropdownMenuItem>
              <RouterLink :to="link.to" class="flex items-center gap-2">
                <Icon :name="link.icon"></Icon>
                <span>{{ t(link.text) }}</span>
              </RouterLink>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <!-- <div v-for="link in linksFooter" :key="link.to">
            <DropdownMenuItem>
              <RouterLink :to="link.to" class="flex items-center gap-2">
                <Icon :name="link.icon"></Icon>
                <span>{{ link.text }}</span>
              </RouterLink>
            </DropdownMenuItem>
          </div> -->
          <DropdownMenuItem>
            <button @click="handleLogout" class="flex items-center gap-2">
              <Icon name="lucide:log-out"></Icon>
              <span>{{ t('auth.logout') }}</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <img
      src="/images/logo-tcheplanner.png"
      alt="Logo"
      :class="['h-6 transition-opacity duration-300 ease-in-out']"
    />
    <div class="flex justify-center items-center gap-2">
      <!-- <LanguageSwitcher /> -->
      <UserSettings />
    </div>
  </nav>
  <div class="w-full flex flex-row justify-center">
    <slot />
  </div>
  <FooterPage />
</template>
