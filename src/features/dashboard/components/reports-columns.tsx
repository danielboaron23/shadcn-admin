import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import type { ReportRow } from '../data/reports'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const integer = new Intl.NumberFormat('en-US')

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const channelTone: Record<ReportRow['channel'], string> = {
  web: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  mobile:
    'border-transparent bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
  partner:
    'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
}

function parseRowDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export const reportsColumns: ColumnDef<ReportRow>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => (
      <div className='ps-3 text-nowrap'>
        {dateFormatter.format(parseRowDate(row.getValue('date')))}
      </div>
    ),
    sortingFn: (a, b, id) => {
      const av = String(a.getValue(id))
      const bv = String(b.getValue(id))
      return av < bv ? -1 : av > bv ? 1 : 0
    },
    meta: {
      className: 'max-md:sticky start-0 z-10 bg-background',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'channel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Channel' />
    ),
    cell: ({ row }) => {
      const channel = row.getValue('channel') as ReportRow['channel']
      return (
        <Badge
          variant='outline'
          className={cn('capitalize', channelTone[channel])}
        >
          {channel}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      const v = row.getValue(id)
      return Array.isArray(value) ? value.includes(v) : true
    },
    enableSorting: false,
  },
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Product' />
    ),
    cell: ({ row }) => (
      <div className='text-nowrap'>{row.getValue('product')}</div>
    ),
  },
  {
    accessorKey: 'units',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Units' />
    ),
    cell: ({ row }) => (
      <div className='tabular-nums'>
        {integer.format(row.getValue('units'))}
      </div>
    ),
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Revenue' />
    ),
    cell: ({ row }) => (
      <div className='font-medium tabular-nums'>
        {currency.format(row.getValue('revenue'))}
      </div>
    ),
  },
]
