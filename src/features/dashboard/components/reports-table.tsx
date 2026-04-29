import { useEffect, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DownloadIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableViewOptions,
} from '@/components/data-table'
import type { ReportRow } from '../data/reports'
import { csvFilename, downloadCsv, rowsToCsv } from '../lib/reports-csv'
import { reportsColumns } from './reports-columns'

type ReportsTableProps = {
  data: ReportRow[]
  search: Record<string, unknown>
  navigate: NavigateFn
  rangeFrom: Date
  rangeTo: Date
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const channelOptions = [
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Partner', value: 'partner' },
]

export function ReportsTable({
  data,
  search,
  navigate,
  rangeFrom,
  rangeTo,
}: ReportsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ])

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 25 },
    globalFilter: { enabled: false },
    columnFilters: [{ columnId: 'channel', searchKey: 'channel', type: 'array' }],
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: reportsColumns,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
    onPaginationChange,
    onColumnFiltersChange,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  const channelColumn = table.getColumn('channel')
  const isFiltered = table.getState().columnFilters.length > 0

  function handleExport() {
    const visibleRows = table
      .getSortedRowModel()
      .rows.filter((row) => {
        // Apply column filters via TanStack's pre-filtered model
        return table
          .getFilteredRowModel()
          .rows.some((r) => r.id === row.id)
      })
      .map((r) => r.original)

    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter((c) => c.id !== 'select' && c.id !== 'actions')

    const csv = rowsToCsv(
      visibleRows,
      visibleColumns.map((col) => ({
        header: col.id.charAt(0).toUpperCase() + col.id.slice(1),
        pick: (row: ReportRow) => {
          const v = row[col.id as keyof ReportRow]
          if (col.id === 'date' && typeof v === 'string') {
            return dateFormatter.format(parseDateOnly(v))
          }
          if (typeof v === 'boolean') return v ? 'Yes' : 'No'
          return v as string | number
        },
      }))
    )

    downloadCsv(csvFilename(rangeFrom, rangeTo), csv)
  }

  return (
    <div className={cn('flex flex-1 flex-col gap-4')}>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-1 flex-wrap items-center gap-2'>
          {channelColumn && (
            <DataTableFacetedFilter
              column={channelColumn}
              title='Channel'
              options={channelOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ms-2 h-4 w-4' />
            </Button>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <DataTableViewOptions table={table} />
          <Button
            variant='outline'
            size='sm'
            className='h-8'
            onClick={handleExport}
            disabled={table.getRowModel().rows.length === 0}
            aria-label='Export visible rows to CSV'
          >
            <DownloadIcon className='me-1.5 size-4' aria-hidden='true' />
            Export CSV
          </Button>
        </div>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <div className='max-md:overflow-x-auto'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='group/row'>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted',
                        header.column.columnDef.meta?.className
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className='group/row'>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'bg-background group-hover/row:bg-muted',
                          cell.column.columnDef.meta?.className
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={reportsColumns.length}
                    className='h-24 text-center'
                  >
                    No rows in this range.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} className='mt-auto' />
    </div>
  )
}

function parseDateOnly(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}
