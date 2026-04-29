import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReportsCategoryChart } from './reports-category-chart'

const meta = {
  title: 'Dashboard/Reports/ReportsCategoryChart',
  component: ReportsCategoryChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReportsCategoryChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { category: 'Subscriptions', revenue: 64_320 },
      { category: 'Services', revenue: 28_410 },
      { category: 'Add-ons', revenue: 14_980 },
      { category: 'Modules', revenue: 9_120 },
      { category: 'Hardware', revenue: 6_480 },
      { category: 'Support', revenue: 5_140 },
    ],
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

export const Single: Story = {
  args: {
    data: [{ category: 'Subscriptions', revenue: 42_000 }],
  },
}
