<script setup lang="ts">
import { useLogout } from './logout'
import { links } from './menu.Links'

const { t } = useI18n()
const props = defineProps<{
  isSidebarCollapsed: boolean
}>()
// const emits = defineEmits(['update:isCollapsed'])
const isCollapsed = ref(props.isSidebarCollapsed)
const { handleLogout } = useLogout()
watch(
  () => props.isSidebarCollapsed,
  newVal => {
    isCollapsed.value = newVal
  },
)
</script>

<template>
  <aside
    :class="[
      'fixed flex flex-col bg-muted/40 border-r h-screen transition-all',
      'duration-300 ease-in-out hidden md:flex',
      isCollapsed ? 'w-16' : 'w-16 md:w-48',
    ]"
  >
    <div class="flex items-center gap-1 ml-1 px-4 h-16 shrink-0">
      <img
        v-if="isCollapsed"
        class="h-7 transition-opacity duration-300 ease-in-out"
        :class="{ 'opacity-0': !isCollapsed }"
        src="/images/tcheplanner-elemento.png"
        alt="Logo"
      />
      <img
        v-if="!isCollapsed"
        src="/images/logo-tcheplanner.png"
        alt="Logo"
        class="md:block hidden h-6 transition-opacity duration-300 ease-in-out"
        :class="{ 'opacity-0': isCollapsed }"
      />
    </div>
    <nav class="flex flex-col gap-4 h-[calc(100%-4rem)] overflow-y-auto">
      <div class="flex-grow">
        <SidebarLinks :links="links" :isCollapsed="isCollapsed" />
      </div>
      <div
        @click="handleLogout"
        class="flex items-center gap-3 bg-background mx-2 mt-auto px-4 py-2 border-t rounded-lg text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer ease-in-out"
      >
        <Icon name="lucide:log-out"></Icon>
        <span v-if="!isCollapsed">{{ t('auth.logout') }}</span>
      </div>
    </nav>
  </aside>
</template>
