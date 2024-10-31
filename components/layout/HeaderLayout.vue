<script setup lang="ts">
import { useLogout } from './logout'
import { links } from './menu.Links'
const emits = defineEmits(['toggleSidebar'])
const props = defineProps<{
  isSidebarCollapsed: boolean
}>()
const { handleLogout } = useLogout()
const { t } = useI18n()
function handleToggleSidebar() {
  emits('toggleSidebar')
}
</script>

<template>
  <nav
    class="flex justify-between items-center gap-2 bg-muted/40 px-4 border-b h-16"
  >
    <button
      @click="handleToggleSidebar"
      variant="outline"
      size="icon"
      class="md:block hidden w-8 h-8 transition-transform duration-300 ease-in-out"
      :class="{ 'rotate-180': props.isSidebarCollapsed }"
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
</template>
