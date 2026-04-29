import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReportRow } from '../data/reports'
import { ReportsTable } from './reports-table'

const meta = {
  title: 'Dashboard/Reports/ReportsTable',
  component: ReportsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReportsTable>

export default meta
type Story = StoryObj<typeof meta>

const sampleRows: ReportRow[] = [
  { id: 'r_001', date: '2026-04-25', channel: 'web', product: 'Pro Plan', category: 'Subscriptions', units: 1, revenue: 149, refunded: false },
  { id: 'r_002', date: '2026-04-24', channel: 'mobile', product: 'Starter Plan', category: 'Subscriptions', units: 2, revenue: 98, refunded: false },
  { id: 'r_003', date: '2026-04-24', channel: 'partner', product: 'Onboarding Service', category: 'Services', units: 1, revenue: 499, refunded: false },
  { id: 'r_004', date: '2026-04-23', channel: 'web', product: 'Team Plan', category: 'Subscriptions', units: 1, revenue: 299, refunded: true },
  { id: 'r_005', date: '2026-04-22', channel: 'web', product: 'API Credits 10k', category: 'Add-ons', units: 3, revenue: 237, refunded: false },
  { id: 'r_006', date: '2026-04-21', channel: 'mobile', product: 'Storage Pack 1TB', category: 'Add-ons', units: 1, revenue: 39, refunded: false },
  { id: 'r_007', date: '2026-04-20', channel: 'partner', product: 'Custom Integration', category: 'Services', units: 1, revenue: 1_200, refunded: false },
  { id: 'r_008', date: '2026-04-19', channel: 'web', product: 'Premium Support', category: 'Support', units: 1, revenue: 199, refunded: false },
  { id: 'r_009', date: '2026-04-18', channel: 'web', product: 'Analytics Module', category: 'Modules', units: 2, revenue: 178, refunded: false },
  { id: 'r_010', date: '2026-04-17', channel: 'mobile', product: 'Reporting Module', category: 'Modules', units: 1, revenue: 89, refunded: true },
  { id: 'r_011', date: '2026-04-16', channel: 'partner', product: 'Hardware Hub', category: 'Hardware', units: 1, revenue: 349, refunded: false },
  { id: 'r_012', date: '2026-04-15', channel: 'web', product: 'Hardware Sensor', category: 'Hardware', units: 4, revenue: 236, refunded: false },
]

function ControlledTable({ data }: { data: ReportRow[] }) {
  const [search, setSearch] = useState<Record<string, unknown>>({})

  return (
    <ReportsTable
      data={data}
      search={search}
      navigate={({ search: nextSearch }) => {
        setSearch((prev) => {
          const resolved = typeof nextSearch === 'function' ? nextSearch(prev) : nextSearch
          return { ...prev, ...(resolved as Record<string, unknown>) }
        })
      }}
      rangeFrom={new Date(2026, 3, 1)}
      rangeTo={new Date(2026, 3, 25)}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledTable data={sampleRows} />,
}

export const Empty: Story = {
  render: () => <ControlledTable data={[]} />,
}

export const SingleRow: Story = {
  render: () => <ControlledTable data={sampleRows.slice(0, 1)} />,
}
