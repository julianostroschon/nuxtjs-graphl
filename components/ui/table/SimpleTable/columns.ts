import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import DataTableDropDown from './DataTableDropDown.vue'
defineComponent({
  name: 'DataTableDropDown',
  setup() {
    const { t } = useI18n()
    t('sidebar.about')
    return () => h(DataTableDropDown)
  },
})
export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
]
type AccepTedValue = string | number | symbol | null | undefined | boolean

interface HeaderDefinition {
  value: AccepTedValue
  component?: HTMLElement
  enableHiding?: boolean
  enableSorting?: boolean
  text: string
  class?: string
}

const buildHeaders = (
  headers: HeaderDefinition[],
): ColumnDef<Record<string, any>>[] => {
  const some = headers.map(headerRaw => {
    const {
      enableSorting = true,
      enableHiding = true,
      class: className,
      component = 'div',
      value,
      text,
    } = headerRaw
    return {
      header: () => h(component, { class: className }, text),
      enableSorting,
      enableHiding,
      acessorKey: value,
      id: value,
    }
  })

  return some
}

export const columnss = [
  {
    value: 'id',
    text: 'id',
    enableHiding: true,
  },
]

export const headers = buildHeaders(columnss)

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: () => h('th', { class: '' }, 'LabelId'),
    cell: ({ row }) => {
      return h('div', { class: '' }, row.getValue('id'))
    },
  },
  {
    accessorKey: 'email',
    id: 'id',
    header: () => h('th', { class: '' }, 'email'),
    cell: ({ row }) => {
      const email = row.getValue<string>('email')

      return h('div', { class: '' }, email)
    },
  },
  // {
  //   accessorKey: 'amount',
  //   header: () => h('th', { class: '' }, 'Amount'),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue('amount'))
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount)

  //     return h('div', { class: '' }, formatted)
  //   },
  // },
  // {
  //   accessorKey: 'status',
  //   header: () => h('div', { class: '' }, 'Status'),
  //   cell: ({ row }) => {
  //     const value = row.getValue<Payment['status']>('status')
  //     // const formatted = new Intl.NumberFormat('en-US', {
  //     //   style: 'currency',
  //     //   currency: 'USD',
  //     // }).format(amount)

  //     return h('div', { class: '' }, value)
  //   },
  // },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return h(
  //       'div',
  //       { class: 'relative' },
  //       h(DataTableDropDown, {
  //         payment,
  //         onExpand: row.toggleExpanded,
  //       }),
  //     )
  //   },
  // },
]
