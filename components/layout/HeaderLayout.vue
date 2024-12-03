<script setup lang="ts">
import { name } from '@/utils/constants'
import { FooterPage } from '@/components/ui/footer'
import { useLogout } from './logout'
import { links } from './menu.Links'

const { handleLogout } = useLogout()
const { t } = useI18n()
const isSidebarCollapsed = ref(true)

function handleToggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <nav
    class="flex justify-between items-center p-4 bg-muted/40 border-b-2 w-full bg-slate-200"
  >
    <button
      @click="handleToggleSidebar"
      variant="outline"
      size="icon"
      class="md:block hidden w-9 h-9 transition-transform duration-300 ease-in-out"
      :class="{ 'rotate-180': isSidebarCollapsed }"
    >
      <Icon name="lucide:menu" />
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
            <span>{{ name.toUpperCase() }}</span>
            <!-- <LanguageSwitcher size="4" /> -->
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div v-for="{ to, icon, text } in links" :key="to">
            <DropdownMenuItem>
              <RouterLink :to class="flex items-center gap-2">
                <Icon :name="icon"></Icon>
                <span>{{ t(text) }}</span>
              </RouterLink>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
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
      <LanguageSwitcher />
      <UserSettings />
    </div>
  </nav>
  <div class="w-full flex flex-row justify-center bg-slate-900">
    <slot />
  </div>
  <FooterPage />
</template>
