import type { DateRange } from './reports-derive'

export type PresetKey =
  | 'today'
  | 'last7'
  | 'last30'
  | 'last90'
  | 'mtd'
  | 'custom'

export const PRESET_KEYS = [
  'today',
  'last7',
  'last30',
  'last90',
  'mtd',
  'custom',
] as const satisfies readonly PresetKey[]

export const DEFAULT_PRESET: PresetKey = 'last30'

export const PRESET_LABELS: Record<PresetKey, string> = {
  today: 'Today',
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  last90: 'Last 90 days',
  mtd: 'Month to date',
  custom: 'Custom',
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

export function rangeForPreset(
  preset: PresetKey,
  now: Date = new Date()
): DateRange {
  const today = startOfDay(now)
  switch (preset) {
    case 'today':
      return { from: today, to: today }
    case 'last7':
      return { from: addDays(today, -6), to: today }
    case 'last30':
      return { from: addDays(today, -29), to: today }
    case 'last90':
      return { from: addDays(today, -89), to: today }
    case 'mtd':
      return {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: today,
      }
    case 'custom':
      // Caller must supply explicit from/to when preset === 'custom'.
      return { from: addDays(today, -29), to: today }
  }
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function parseIsoDate(s: string | undefined): Date | undefined {
  if (!s) return undefined
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) return undefined
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  d.setHours(0, 0, 0, 0)
  return Number.isNaN(d.getTime()) ? undefined : d
}
