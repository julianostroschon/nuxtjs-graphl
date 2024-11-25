<script lang="ts">
// import TopHeader from '~/components/ui/top-header/index.vue'
import HeaderLayout from '~/components/layout/HeaderLayout.vue'
// import { useLogout } from './logout'
// const emits = defineEmits(['toggleSidebar'])
export default defineComponent({
  name: 'HeaderComponent',
  components: {
    // TopHeader,
    HeaderLayout,
  },

  setup(props, { emit }) {
    return {
      // name: props,
      // isSidebarCollapsed: ref(false),
      emit,
    }
  },
})
</script>

<template>
  <HeaderLayout>
    <slot />
  </HeaderLayout>
</template>
