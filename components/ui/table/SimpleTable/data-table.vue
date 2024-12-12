<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { string } from 'zod';

defineProps({
  rows: {
    type: Object,
    required: true,
  },
  columns: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
  </div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="column in columns" :key="column.key">
          {{ column.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row, key in rows" :key="key">
        <TableCell v-for="column in columns" :key="column.key">          
          {{ row[column.key] }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>