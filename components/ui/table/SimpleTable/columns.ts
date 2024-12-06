import { Checkbox } from '@/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTableDropDown from './DataTableDropDown.vue'
// import type { Payment } from './data-table.vue'
import { useI18n } from 'vue-i18n'
defineComponent({
  name: 'DataTableDropDown',
  setup() {
    const { t } = useI18n()
    t('sidebar.about')
    return () => h(DataTableDropDown)
  },
})
// const { t } = useI18n()
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
  // ...
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

const buildHeaders = (headers: HeaderDefinition[]) => {
  // console.log({ headers })
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
      id: value,
    }
  })

  console.log({ some })
  return some
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        // ariaLabel: t('sidebar.about'),
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'id',
  //   header: () => h('th', { class: '' }, 'LabelId'),
  //   cell: ({ row }) => {
  //     // console.log({ row })
  //     // const value = row.getValue('id')
  //     // // const formatted = new Intl.NumberFormat('en-US', {
  //     // //   style: 'currency',
  //     // //   currency: 'USD',
  //     // // }).format(amount)

  //     return h('div', { class: '' }, row.getValue('id'))
  //   },
  // },
  // {
  //   accessorKey: 'email',
  //   header: () => h('th', { class: '' }, 'email'),
  //   cell: ({ row }) => {
  //     const email = row.getValue('email')
  //     // const formatted = new Intl.NumberFormat('en-US', {
  //     //   style: 'currency',
  //     //   currency: 'USD',
  //     // }).format(email)

  //     return h('div', { class: '' }, email)
  //   },
  // },
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
  //   accessorKey: 'nove',
  //   header: () => h('div', { class: '' }, 'Nove'),
  //   cell: ({ row }) => {
  //     const value = row.getValue<Payment['status']>('nove')

  //     return h('div', { class: '' }, value)
  //   },
  // },
  // {
  //   accessorKey: 'status',
  //   header: () => h('div', { class: '' }, 'Status'),
  //   cell: ({ row }) => {
  //     const value = row.getValue<Payment['status']>('status')

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
export const columnss = [
  {
    value: 'select',
    text: 'labelId',
    enableHiding: true,
  },
  // {
  //   text: 'e-mail',
  //   value: 'email',
  // },
  // {
  //   value: 'amount',
  //   text: 'amount',
  // },
  // {
  //   value: 'status',
  //   text: 'Status',
  // },
  // {
  //   value: 'actions',
  //   text: 'actions',
  //   enableHiding: false,
  //   // cell: ({ row }) => {
  //   //   const payment = row.original

  //   //   return h(
  //   //     'div',
  //   //     { class: 'relative' },
  //   //     h(DataTableDropDown, {
  //   //       payment,
  //   //       onExpand: row.toggleExpanded,
  //   //     }),
  //   //   )
  //   // },
  // },
]

export const headers = buildHeaders(columnss)
