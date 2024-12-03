<script lang="ts" setup>
import { useLogout } from './logout'

const { t } = useI18n()
const props = defineProps<{
  isSidebarCollapsed?: boolean
}>()
const isCollapsed = ref(props.isSidebarCollapsed)
const { handleLogout } = useLogout()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex items-center">
      <Icon class="w-6 h-6" name="lucide:settings" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{{ t('common.config') }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="flex items-center">
        <RouterLink to="/user/config" class="flex items-center gap-2">
          <Icon name="lucide:user-round-cog"></Icon>
          <span>{{ t('user.config') }}</span>
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator class="block sm:hidden" />
      <DropdownMenuItem class="block sm:hidden">
        <div
          @click="handleLogout"
          class="flex flex-1 items-center text-red-300 gap-3 mt-auto text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer ease-in-out"
        >
          <Icon name="lucide:log-out" class=""></Icon>
          <span v-if="!isCollapsed">{{ t('auth.logout') }}</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
