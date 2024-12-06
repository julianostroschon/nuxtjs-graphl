<script setup lang="ts" generic="TData, TValue">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  VisibilityState,
} from '@tanstack/vue-table'

import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import OmitColumToggle from '../components/OmitColumToggle.vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  canOmitColumns: {
    type: Boolean
    default: false
  }
}>()

const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),

  state: {
    // get sorting() { return sorting.value },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
  },
})
</script>

<template>
  <div>
    {{ table.getAllColumns() }}
    <div class="flex items-center py-4">
      <slot name="prepend" :table />
      <OmitColumToggle v-if="!canOmitColumns" :table />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="{ headers, id } in table.getHeaderGroups()"
            :key="id"
          >
            <TableHead
              v-for="{ isPlaceholder, column, id, getContext } in headers"
              :key="id"
            >
              <FlexRender
                v-if="!isPlaceholder"
                :render="column.columnDef.header"
                :props="getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template
              v-for="{
                getIsSelected,
                getVisibleCells,
                getIsExpanded,
                getAllCells,
                original,
                id,
              } in table.getRowModel().rows"
              :key="id"
            >
              <TableRow :data-state="getIsSelected() ? 'selected' : undefined">
                <TableCell v-for="cell in getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="getIsExpanded()">
                <TableCell :colspan="getAllCells().length">
                  {{ JSON.stringify(original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        <Icon name="lucide:chevron-left" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        <Icon name="lucide:chevron-right" />
      </Button>
    </div>
  </div>
</template>
