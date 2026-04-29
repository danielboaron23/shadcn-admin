import type { ReportRow } from '../data/reports'

export type DateRange = { from: Date; to: Date }

export type Kpis = {
  revenue: number
  orders: number
  aov: number
  refundRate: number // 0..1
  deltas: {
    revenue: number // % vs previous, e.g. 0.201 = +20.1%
    orders: number
    aov: number
    refundRate: number // percentage-point delta (e.g. -0.003 = -0.3pp)
  }
}

export type Bucket = 'day' | 'week' | 'month'

export type RevenuePoint = {
  bucketStart: string // ISO yyyy-MM-dd
  label: string
  revenue: number
}

export type CategorySlice = {
  category: string
  revenue: number
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

function diffDaysInclusive(from: Date, to: Date) {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime()
  return Math.round(ms / 86_400_000) + 1
}

function parseRowDate(iso: string) {
  // The dataset stores yyyy-MM-dd; build a local-midnight Date so it lines
  // up with the picker's local-midnight ranges.
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function filterByRange(
  rows: ReportRow[],
  range: DateRange
): ReportRow[] {
  const from = startOfDay(range.from).getTime()
  const to = startOfDay(range.to).getTime()
  return rows.filter((r) => {
    const t = parseRowDate(r.date).getTime()
    return t >= from && t <= to
  })
}

// Same length immediately preceding window (Stripe / Linear convention).
export function previousPeriod(range: DateRange): DateRange {
  const days = diffDaysInclusive(range.from, range.to)
  return {
    from: addDays(range.from, -days),
    to: addDays(range.from, -1),
  }
}

function sum(rows: ReportRow[], pick: (r: ReportRow) => number) {
  let total = 0
  for (const r of rows) total += pick(r)
  return total
}

function safeDelta(curr: number, prev: number) {
  if (prev === 0) return curr === 0 ? 0 : 1
  return (curr - prev) / prev
}

export function computeKpis(all: ReportRow[], range: DateRange): Kpis {
  const current = filterByRange(all, range)
  const previous = filterByRange(all, previousPeriod(range))

  const revenue = sum(current, (r) => r.revenue)
  const orders = current.length
  const aov = orders === 0 ? 0 : revenue / orders
  const refunds = current.filter((r) => r.refunded).length
  const refundRate = orders === 0 ? 0 : refunds / orders

  const prevRevenue = sum(previous, (r) => r.revenue)
  const prevOrders = previous.length
  const prevAov = prevOrders === 0 ? 0 : prevRevenue / prevOrders
  const prevRefunds = previous.filter((r) => r.refunded).length
  const prevRefundRate = prevOrders === 0 ? 0 : prevRefunds / prevOrders

  return {
    revenue,
    orders,
    aov,
    refundRate,
    deltas: {
      revenue: safeDelta(revenue, prevRevenue),
      orders: safeDelta(orders, prevOrders),
      aov: safeDelta(aov, prevAov),
      refundRate: refundRate - prevRefundRate, // percentage-point
    },
  }
}

export function pickBucket(range: DateRange): Bucket {
  const days = diffDaysInclusive(range.from, range.to)
  if (days <= 14) return 'day'
  if (days <= 90) return 'week'
  return 'month'
}

function startOfWeek(d: Date) {
  // ISO week (Monday start) — matches the spec's "weekly (ISO week)" decision.
  const x = startOfDay(d)
  const dow = x.getDay() // 0=Sun..6=Sat
  const offset = (dow + 6) % 7 // days since Monday
  return addDays(x, -offset)
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function bucketKey(d: Date, bucket: Bucket): Date {
  if (bucket === 'day') return startOfDay(d)
  if (bucket === 'week') return startOfWeek(d)
  return startOfMonth(d)
}

function isoKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function bucketLabel(d: Date, bucket: Bucket): string {
  if (bucket === 'month')
    return `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
  // day / week → "MMM d"
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`
}

export function bucketRevenue(
  rows: ReportRow[],
  range: DateRange,
  bucket: Bucket = pickBucket(range)
): RevenuePoint[] {
  const buckets = new Map<string, { date: Date; revenue: number }>()

  // Pre-seed empty buckets across the range so the chart shows zeros, not gaps.
  let cursor = bucketKey(range.from, bucket)
  const end = bucketKey(range.to, bucket)
  while (cursor.getTime() <= end.getTime()) {
    buckets.set(isoKey(cursor), { date: new Date(cursor), revenue: 0 })
    if (bucket === 'day') cursor = addDays(cursor, 1)
    else if (bucket === 'week') cursor = addDays(cursor, 7)
    else cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
  }

  for (const r of rows) {
    const key = bucketKey(parseRowDate(r.date), bucket)
    const k = isoKey(key)
    const prev = buckets.get(k)
    if (prev) prev.revenue += r.revenue
    else buckets.set(k, { date: key, revenue: r.revenue })
  }

  return Array.from(buckets.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((b) => ({
      bucketStart: isoKey(b.date),
      label: bucketLabel(b.date, bucket),
      revenue: Math.round(b.revenue * 100) / 100,
    }))
}

export function categoryBreakdown(
  rows: ReportRow[],
  topN = 6
): CategorySlice[] {
  const byCat = new Map<string, number>()
  for (const r of rows)
    byCat.set(r.category, (byCat.get(r.category) ?? 0) + r.revenue)
  const sorted = Array.from(byCat.entries())
    .map(([category, revenue]) => ({
      category,
      revenue: Math.round(revenue * 100) / 100,
    }))
    .sort((a, b) => b.revenue - a.revenue)
  return sorted.slice(0, topN)
}
