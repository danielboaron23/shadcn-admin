import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Kpis } from '../lib/reports-derive'
import { ReportsKpis } from './reports-kpis'

const meta = {
  title: 'Dashboard/Reports/ReportsKpis',
  component: ReportsKpis,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className='w-full max-w-[1280px]'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ReportsKpis>

export default meta
type Story = StoryObj<typeof meta>

const baseKpis: Kpis = {
  revenue: 128_450,
  orders: 1_284,
  aov: 100.04,
  refundRate: 0.038,
  deltas: {
    revenue: 0.201,
    orders: 0.124,
    aov: 0.068,
    refundRate: -0.005,
  },
}

export const Default: Story = {
  args: {
    kpis: baseKpis,
  },
}

export const Loading: Story = {
  args: {
    kpis: null,
    loading: true,
  },
}

export const NegativeDeltas: Story = {
  args: {
    kpis: {
      revenue: 84_210,
      orders: 902,
      aov: 93.36,
      refundRate: 0.071,
      deltas: {
        revenue: -0.142,
        orders: -0.087,
        aov: -0.053,
        refundRate: 0.018,
      },
    },
  },
}

export const NoChange: Story = {
  args: {
    kpis: {
      revenue: 100_000,
      orders: 1_000,
      aov: 100,
      refundRate: 0.04,
      deltas: { revenue: 0, orders: 0, aov: 0, refundRate: 0 },
    },
  },
}

export const Empty: Story = {
  args: {
    kpis: {
      revenue: 0,
      orders: 0,
      aov: 0,
      refundRate: 0,
      deltas: { revenue: 0, orders: 0, aov: 0, refundRate: 0 },
    },
  },
}

export const RefundRateImproving: Story = {
  args: {
    kpis: {
      revenue: 142_080,
      orders: 1_402,
      aov: 101.34,
      refundRate: 0.024,
      deltas: {
        revenue: 0.082,
        orders: 0.041,
        aov: 0.039,
        refundRate: -0.014,
      },
    },
  },
}
