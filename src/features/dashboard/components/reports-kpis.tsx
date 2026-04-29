import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Kpis } from '../lib/reports-derive'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const currencyExact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const integer = new Intl.NumberFormat('en-US')
const percent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

function formatPercentDelta(delta: number): string {
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : ''
  return `${sign}${percent.format(Math.abs(delta))}`
}

function formatPpDelta(delta: number): string {
  const pp = delta * 100
  const sign = pp > 0 ? '+' : pp < 0 ? '−' : ''
  return `${sign}${Math.abs(pp).toFixed(1)} pp`
}

type KpiCardProps = {
  label: string
  value: string
  delta: number
  formatDelta: (delta: number) => string
  trendingText: string
  caption: string
  // For metrics where down is good (e.g. refund rate) — tone is inverted.
  invertedTrend?: boolean
  titleNode?: React.ReactNode
}

function KpiCard({
  label,
  value,
  delta,
  formatDelta,
  trendingText,
  caption,
  invertedTrend = false,
  titleNode,
}: KpiCardProps) {
  const isUp = delta > 0
  const isFlat = delta === 0
  const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon
  const positive = invertedTrend ? !isUp && !isFlat : isUp
  const tone = isFlat
    ? 'text-muted-foreground'
    : positive
      ? 'text-emerald-600'
      : 'text-red-600'

  return (
    <Card className='gap-2 p-4'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 p-0'>
        {titleNode ?? (
          <CardTitle className='text-sm font-normal'>{label}</CardTitle>
        )}
        <Badge
          variant='outline'
          className='rounded-full px-2 py-0.5 text-xs font-semibold'
        >
          <TrendIcon className='size-3' aria-hidden='true' />
          <span>{formatDelta(delta)}</span>
        </Badge>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='text-3xl font-semibold tracking-tight tabular-nums'>
          {value}
        </div>
        <div className={cn('mt-2 flex items-center gap-1.5 text-sm', tone)}>
          <span>{trendingText}</span>
          <TrendIcon className='size-4' aria-hidden='true' />
        </div>
        <p className='text-muted-foreground mt-1 text-xs'>{caption}</p>
      </CardContent>
    </Card>
  )
}

function trendingTextFor(
  metric: 'revenue' | 'orders' | 'aov' | 'refundRate',
  delta: number
): string {
  const direction = delta > 0 ? 'up' : 'down'
  if (delta === 0) return 'Flat vs previous period'
  switch (metric) {
    case 'revenue':
      return direction === 'up'
        ? 'Trending up this period'
        : 'Down vs previous period'
    case 'orders':
      return direction === 'up'
        ? 'More orders than last period'
        : 'Fewer orders than last period'
    case 'aov':
      return direction === 'up'
        ? 'Customers spending more per order'
        : 'Spend per order is slipping'
    case 'refundRate':
      return direction === 'up'
        ? 'Refunds rising — investigate'
        : 'Refunds easing this period'
  }
}

type ReportsKpisProps = {
  kpis: Kpis | null
  loading?: boolean
}

export function ReportsKpis({ kpis, loading = false }: ReportsKpisProps) {
  if (loading || !kpis) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='gap-2 p-4'>
            <CardHeader className='flex flex-row items-start justify-between space-y-0 p-0'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-5 w-14 rounded-full' />
            </CardHeader>
            <CardContent className='p-0'>
              <Skeleton className='h-8 w-28' />
              <Skeleton className='mt-2 h-4 w-40' />
              <Skeleton className='mt-1 h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <KpiCard
        label='Revenue'
        value={currency.format(kpis.revenue)}
        delta={kpis.deltas.revenue}
        formatDelta={formatPercentDelta}
        trendingText={trendingTextFor('revenue', kpis.deltas.revenue)}
        caption='Last 30 days revenue'
      />
      <KpiCard
        label='Orders'
        value={integer.format(kpis.orders)}
        delta={kpis.deltas.orders}
        formatDelta={formatPercentDelta}
        trendingText={trendingTextFor('orders', kpis.deltas.orders)}
        caption='Orders in selected range'
      />
      <KpiCard
        label='Avg Order Value'
        value={currencyExact.format(kpis.aov)}
        delta={kpis.deltas.aov}
        formatDelta={formatPercentDelta}
        trendingText={trendingTextFor('aov', kpis.deltas.aov)}
        caption='Revenue per order'
      />
      <KpiCard
        label='Refund Rate'
        value={percent.format(kpis.refundRate)}
        delta={kpis.deltas.refundRate}
        formatDelta={formatPpDelta}
        trendingText={trendingTextFor('refundRate', kpis.deltas.refundRate)}
        caption='Lower is better'
        invertedTrend
        titleNode={
          <CardTitle
            className='text-sm font-normal'
            popoverTitle='Refund Rate'
            popoverContent={
              <p>
                Lower is better — fewer refunds means a healthier business.
                Down arrows are green; up arrows are red.
              </p>
            }
          >
            Refund Rate
          </CardTitle>
        }
      />
    </div>
  )
}
