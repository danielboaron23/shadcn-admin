import type { Meta, StoryObj } from '@storybook/react-vite'
import type { RevenuePoint } from '../lib/reports-derive'
import { ReportsRevenueChart } from './reports-revenue-chart'

const meta = {
  title: 'Dashboard/Reports/ReportsRevenueChart',
  component: ReportsRevenueChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 720 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReportsRevenueChart>

export default meta
type Story = StoryObj<typeof meta>

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function generate(count: number, base: number, variance: number): RevenuePoint[] {
  let cursor = new Date(2026, 0, 1)
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(cursor)
    cursor.setDate(cursor.getDate() + 1)
    const wave = Math.sin(i / 3) * variance
    const drift = i * (base * 0.01)
    const revenue = Math.max(0, Math.round(base + drift + wave))
    return {
      bucketStart: date.toISOString().slice(0, 10),
      label: `${MONTHS[date.getMonth()]} ${date.getDate()}`,
      revenue,
    }
  })
}

export const Default: Story = {
  args: {
    data: generate(30, 4_200, 1_500),
  },
}

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}

export const Sparse: Story = {
  args: {
    data: generate(7, 1_800, 600),
  },
}

export const HighVolume: Story = {
  args: {
    data: generate(60, 18_000, 6_000),
  },
}
