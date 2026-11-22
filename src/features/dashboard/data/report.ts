/**
 * Single source of truth for the dashboard numbers.
 *
 * The Overview chart and Recent Sales list render from this file, and the
 * Download button (demo feature: KAN "Download report") should export from it,
 * so the file a user downloads always matches what they see on screen.
 * Values are fixed (no Math.random) so every demo take is identical.
 */

export type DashboardKpi = {
  id: 'revenue' | 'subscriptions' | 'sales' | 'active-now'
  label: string
  /** Display value, exactly as shown on the card. */
  value: string
  /** Change text, exactly as shown under the value. */
  change: string
}

export type MonthlyRevenue = {
  /** Short month name, used as the chart axis label. */
  name: string
  /** Revenue in USD. */
  total: number
}

export type RecentSale = {
  name: string
  email: string
  /** Amount in USD. */
  amount: number
  avatar: string
  initials: string
}

export const reportPeriod = {
  label: 'November 2026',
  start: '2026-11-01',
  end: '2026-11-30',
} as const

export const dashboardKpis: DashboardKpi[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    value: '+2350',
    change: '+180.1% from last month',
  },
  {
    id: 'sales',
    label: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
  },
  {
    id: 'active-now',
    label: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
  },
]

export const monthlyRevenue: MonthlyRevenue[] = [
  { name: 'Jan', total: 2140 },
  { name: 'Feb', total: 3380 },
  { name: 'Mar', total: 2960 },
  { name: 'Apr', total: 4210 },
  { name: 'May', total: 3720 },
  { name: 'Jun', total: 5130 },
  { name: 'Jul', total: 4480 },
  { name: 'Aug', total: 3910 },
  { name: 'Sep', total: 4650 },
  { name: 'Oct', total: 5420 },
  { name: 'Nov', total: 5870 },
  { name: 'Dec', total: 1290 },
]

export const recentSales: RecentSale[] = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: 1999,
    avatar: '/avatars/01.png',
    initials: 'OM',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: 39,
    avatar: '/avatars/02.png',
    initials: 'JL',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: 299,
    avatar: '/avatars/03.png',
    initials: 'IN',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: 99,
    avatar: '/avatars/04.png',
    initials: 'WK',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: 39,
    avatar: '/avatars/05.png',
    initials: 'SD',
  },
]
