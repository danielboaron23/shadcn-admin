import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import type { CategorySlice } from '../lib/reports-derive'

const exactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})

// Theme tokens — already light/dark tuned in src/styles/theme.css.
const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const

const FALLBACK_COLOR = 'var(--muted-foreground)'

type TooltipPayload = {
  payload: CategorySlice
  value: number
}

function ChartTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  total: number
}) {
  if (!active || !payload || payload.length === 0) return null
  const slice = payload[0].payload
  const share = total === 0 ? 0 : slice.revenue / total
  return (
    <div className='bg-popover text-popover-foreground rounded-md border p-2 text-xs shadow-md'>
      <div className='font-medium'>{slice.category}</div>
      <div className='tabular-nums'>{exactCurrency.format(slice.revenue)}</div>
      <div className='text-muted-foreground'>
        {percent.format(share)} of total
      </div>
    </div>
  )
}

type ReportsCategoryChartProps = {
  data: CategorySlice[]
  loading?: boolean
  height?: number
}

export function ReportsCategoryChart({
  data,
  loading = false,
  height = 300,
}: ReportsCategoryChartProps) {
  const total = useMemo(
    () => data.reduce((sum, s) => sum + s.revenue, 0),
    [data]
  )

  if (loading) {
    return <Skeleton style={{ height }} className='w-full' />
  }

  if (data.length === 0) {
    return (
      <div
        className='text-muted-foreground flex items-center justify-center text-sm'
        style={{ height }}
      >
        No category data in this range.
      </div>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <XAxis
          dataKey='category'
          className='text-muted-foreground'
          stroke='currentColor'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0}
          tick={{ width: 60 }}
        />
        <YAxis
          className='text-muted-foreground'
          stroke='currentColor'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => exactCurrency.format(value)}
          width={60}
        />
        <Tooltip
          cursor={{ className: 'fill-muted', opacity: 0.4 } as never}
          content={<ChartTooltip total={total} />}
        />
        <Bar dataKey='revenue' radius={[4, 4, 0, 0]}>
          {data.map((slice, i) => (
            <Cell
              key={slice.category}
              fill={CHART_COLORS[i] ?? FALLBACK_COLOR}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
