<script setup lang="ts" generic="TData, TValue">
defineProps({
  table: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="ml-auto">
        Columns
        <ChevronDown class="w-4 h-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem
        v-for="{ getIsVisible, id, toggleVisibility } in table
          .getAllColumns()
          .filter(column => column.getCanHide())"
        :key="id"
        class="capitalize"
        :checked="getIsVisible()"
        @update:checked="
          value => {
            toggleVisibility(!!value)
          }
        "
      >
        {{ id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
