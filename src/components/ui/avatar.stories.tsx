import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const WithFallback: Story = {
  args: {
    children: <AvatarFallback>JD</AvatarFallback>,
  },
};

export const Large: Story = {
  args: {
    className: 'size-16',
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    className: 'size-6',
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    ),
  },
};

export const BrokenImage: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://broken-link.png" alt="Broken" />
        <AvatarFallback>BR</AvatarFallback>
      </>
    ),
  },
};

