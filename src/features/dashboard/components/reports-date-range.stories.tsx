import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DateRange } from '../lib/reports-derive'
import { rangeForPreset, type PresetKey } from '../lib/reports-presets'
import { ReportsDateRange } from './reports-date-range'

const meta: Meta<typeof ReportsDateRange> = {
  title: 'Dashboard/Reports/ReportsDateRange',
  component: ReportsDateRange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ReportsDateRange>

function ControlledDateRange({ initialPreset }: { initialPreset: PresetKey }) {
  const [preset, setPreset] = useState<PresetKey>(initialPreset)
  const [range, setRange] = useState<DateRange>(rangeForPreset(initialPreset))

  return (
    <ReportsDateRange
      preset={preset}
      range={range}
      onChange={(next) => {
        setPreset(next.preset)
        setRange(next.range)
      }}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledDateRange initialPreset='last30' />,
}

export const Last7Days: Story = {
  render: () => <ControlledDateRange initialPreset='last7' />,
}

export const MonthToDate: Story = {
  render: () => <ControlledDateRange initialPreset='mtd' />,
}

export const Last90Days: Story = {
  render: () => <ControlledDateRange initialPreset='last90' />,
}

export const Custom: Story = {
  render: () => {
    function CustomRange() {
      const [preset, setPreset] = useState<PresetKey>('custom')
      const [range, setRange] = useState<DateRange>({
        from: new Date(2026, 1, 14),
        to: new Date(2026, 2, 8),
      })
      return (
        <ReportsDateRange
          preset={preset}
          range={range}
          onChange={(next) => {
            setPreset(next.preset)
            setRange(next.range)
          }}
        />
      )
    }
    return <CustomRange />
  },
}
