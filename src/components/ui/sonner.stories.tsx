import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toaster } from './sonner';
import { Button } from './button';
import { toast } from 'sonner';

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => toast('Event has been created')}
        >
          Show Toast
        </Button>
        <Button
          onClick={() => toast.success('Event has been created')}
        >
          Success Toast
        </Button>
        <Button
          onClick={() => toast.error('Event creation failed')}
        >
          Error Toast
        </Button>
        <Button
          onClick={() => toast.info('New update available')}
        >
          Info Toast
        </Button>
        <Button
          onClick={() => toast.warning('Please check your input')}
        >
          Warning Toast
        </Button>
        <Button
          onClick={() =>
            toast('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm',
            })
          }
        >
          Toast with Description
        </Button>
        <Button
          onClick={() =>
            toast('Event has been created', {
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo'),
              },
            })
          }
        >
          Toast with Action
        </Button>
      </div>
    </>
  ),
};

