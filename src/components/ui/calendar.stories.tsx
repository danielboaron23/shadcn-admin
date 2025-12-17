import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './calendar';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar />,
};

export const WithSelectedDate: Story = {
  render: () => <Calendar mode="single" selected={new Date()} />,
};

export const Range: Story = {
  render: () => (
    <Calendar
      mode="range"
      selected={{
        from: new Date(2024, 0, 1),
        to: new Date(2024, 0, 7),
      }}
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <Calendar
      mode="multiple"
      selected={[new Date(2024, 0, 1), new Date(2024, 0, 5), new Date(2024, 0, 10)]}
    />
  ),
};

export const WithDisabledDates: Story = {
  render: () => (
    <Calendar
      mode="single"
      disabled={(date) => date < new Date()}
    />
  ),
};

