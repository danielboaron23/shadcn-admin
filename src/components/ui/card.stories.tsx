import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const WithAction: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Action</CardTitle>
          <CardDescription>This card has an action button</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              ⋮
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>You can add action buttons in the header.</p>
        </CardContent>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <CardContent>
        <p>Simple card with just content.</p>
      </CardContent>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Multiple Actions</CardTitle>
          <CardDescription>Card with multiple action buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has multiple action buttons in the footer.</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </>
    ),
  },
};

