import { useState } from 'react'
import { CalendarIcon, CheckIcon } from 'lucide-react'
import type { DateRange as DayPickerRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { DateRange } from '../lib/reports-derive'
import {
  DEFAULT_PRESET,
  PRESET_KEYS,
  PRESET_LABELS,
  type PresetKey,
  rangeForPreset,
} from '../lib/reports-presets'

type ReportsDateRangeProps = {
  preset: PresetKey
  range: DateRange
  onChange: (next: { preset: PresetKey; range: DateRange }) => void
}

const triggerFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
})

const triggerFormatterWithYear = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function formatTriggerLabel(preset: PresetKey, range: DateRange): string {
  if (preset !== 'custom') return PRESET_LABELS[preset]
  const sameYear = range.from.getFullYear() === range.to.getFullYear()
  if (sameYear) {
    return `${triggerFormatter.format(range.from)} – ${triggerFormatterWithYear.format(range.to)}`
  }
  return `${triggerFormatterWithYear.format(range.from)} – ${triggerFormatterWithYear.format(range.to)}`
}

export function ReportsDateRange({ preset, range, onChange }: ReportsDateRangeProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DayPickerRange | undefined>({
    from: range.from,
    to: range.to,
  })

  function handlePreset(next: PresetKey) {
    const nextRange = rangeForPreset(next === 'custom' ? DEFAULT_PRESET : next)
    setDraft({ from: nextRange.from, to: nextRange.to })
    if (next !== 'custom') {
      onChange({ preset: next, range: nextRange })
      setOpen(false)
    }
  }

  function handleCalendar(next: DayPickerRange | undefined) {
    setDraft(next)
    if (next?.from && next?.to) {
      onChange({ preset: 'custom', range: { from: next.from, to: next.to } })
      setOpen(false)
    }
  }

  const label = formatTriggerLabel(preset, range)

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setDraft({ from: range.from, to: range.to })
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          aria-label={`Date range: ${label}. Click to change.`}
          className='justify-start text-left font-normal max-sm:w-full'
        >
          <CalendarIcon className='me-2 h-4 w-4' aria-hidden='true' />
          <span>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='w-auto max-w-[calc(100vw-2rem)] p-0'
      >
        <div className='flex flex-col sm:flex-row'>
          <div
            role='listbox'
            aria-label='Date range presets'
            className='flex flex-row gap-1 border-b p-2 sm:w-40 sm:flex-col sm:border-b-0 sm:border-e overflow-x-auto sm:overflow-visible'
          >
            {PRESET_KEYS.map((key) => {
              const active = key === preset
              return (
                <button
                  key={key}
                  type='button'
                  role='option'
                  aria-selected={active}
                  onClick={() => handlePreset(key)}
                  className={cn(
                    'flex w-full shrink-0 items-center justify-between rounded-md px-2 py-1.5 text-sm whitespace-nowrap transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active && 'bg-accent text-accent-foreground font-medium'
                  )}
                >
                  <span>{PRESET_LABELS[key]}</span>
                  {active && <CheckIcon className='ms-2 h-3.5 w-3.5' aria-hidden='true' />}
                </button>
              )
            })}
          </div>
          <div className='p-2'>
            <Calendar
              mode='range'
              numberOfMonths={1}
              selected={draft}
              onSelect={handleCalendar}
              defaultMonth={draft?.from ?? range.from}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
