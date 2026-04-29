import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import type { RevenuePoint } from '../lib/reports-derive'

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const exactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
})

type TooltipPayload = {
  payload: RevenuePoint
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
  const point = payload[0].payload
  const share = total === 0 ? 0 : point.revenue / total
  return (
    <div className='bg-popover text-popover-foreground rounded-md border p-2 text-xs shadow-md'>
      <div className='font-medium'>{point.label}</div>
      <div className='tabular-nums'>{exactCurrency.format(point.revenue)}</div>
      <div className='text-muted-foreground'>
        {percent.format(share)} of period
      </div>
    </div>
  )
}

type ReportsRevenueChartProps = {
  data: RevenuePoint[]
  loading?: boolean
  height?: number
}

export function ReportsRevenueChart({
  data,
  loading = false,
  height = 300,
}: ReportsRevenueChartProps) {
  const total = useMemo(
    () => data.reduce((sum, p) => sum + p.revenue, 0),
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
        No revenue in this range.
      </div>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <XAxis
          dataKey='label'
          className='text-muted-foreground'
          stroke='currentColor'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className='text-muted-foreground'
          stroke='currentColor'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => compactCurrency.format(value)}
          width={60}
        />
        <Tooltip
          cursor={{ stroke: 'currentColor', className: 'text-border' } as never}
          content={<ChartTooltip total={total} />}
        />
        <Area
          type='monotone'
          dataKey='revenue'
          stroke='currentColor'
          className='text-primary'
          fill='currentColor'
          fillOpacity={0.15}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
