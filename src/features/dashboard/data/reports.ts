export type ReportChannel = 'web' | 'mobile' | 'partner'

export type ReportRow = {
  id: string
  date: string // ISO yyyy-MM-dd
  channel: ReportChannel
  product: string
  category: string
  units: number
  revenue: number
  refunded: boolean
}

const CATALOG: { product: string; category: string; price: number }[] = [
  { product: 'Pro Plan', category: 'Subscriptions', price: 149 },
  { product: 'Team Plan', category: 'Subscriptions', price: 299 },
  { product: 'Starter Plan', category: 'Subscriptions', price: 49 },
  { product: 'Onboarding Service', category: 'Services', price: 499 },
  { product: 'Custom Integration', category: 'Services', price: 1200 },
  { product: 'Premium Support', category: 'Support', price: 199 },
  { product: 'API Credits 10k', category: 'Add-ons', price: 79 },
  { product: 'Storage Pack 1TB', category: 'Add-ons', price: 39 },
  { product: 'Analytics Module', category: 'Modules', price: 89 },
  { product: 'Reporting Module', category: 'Modules', price: 89 },
  { product: 'Hardware Hub', category: 'Hardware', price: 349 },
  { product: 'Hardware Sensor', category: 'Hardware', price: 59 },
]

const CHANNELS: ReportChannel[] = ['web', 'mobile', 'partner']

// Mulberry32 deterministic PRNG — keeps the dataset stable across renders.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function buildDataset(): ReportRow[] {
  // Anchor at the most recent midnight in the user's local timezone so the
  // "Last N days" presets always include today.
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(start.getDate() - 365)

  const rand = mulberry32(0xc0ffee)
  const rows: ReportRow[] = []
  const targetRows = 220

  for (let i = 0; i < targetRows; i++) {
    const dayOffset = Math.floor(rand() * 366) // 0..365
    const date = new Date(start)
    date.setDate(date.getDate() + dayOffset)

    const item = CATALOG[Math.floor(rand() * CATALOG.length)]
    const channel = CHANNELS[Math.floor(rand() * CHANNELS.length)]
    const units = 1 + Math.floor(rand() * 5)
    // ±15% revenue noise so AOV deltas are not flat
    const noise = 0.85 + rand() * 0.3
    const revenue = Math.round(item.price * units * noise * 100) / 100
    const refunded = rand() < 0.06

    rows.push({
      id: `r_${i.toString(36).padStart(3, '0')}`,
      date: isoDate(date),
      channel,
      product: item.product,
      category: item.category,
      units,
      revenue,
      refunded,
    })
  }

  rows.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return rows
}

export const reports: ReportRow[] = buildDataset()
