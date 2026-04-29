import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Popover, PopoverTrigger, PopoverContent } from './popover'

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='space-y-2'>
          <h4 className='leading-none font-medium'>Dimensions</h4>
          <p className='text-muted-foreground text-sm'>
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='leading-none font-medium'>Dimensions</h4>
            <p className='text-muted-foreground text-sm'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <label htmlFor='width' className='text-sm'>
                Width
              </label>
              <input
                id='width'
                defaultValue='100%'
                className='border-input bg-background col-span-2 h-8 rounded-md border px-3 text-sm'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <label htmlFor='maxWidth' className='text-sm'>
                Max. width
              </label>
              <input
                id='maxWidth'
                defaultValue='300px'
                className='border-input bg-background col-span-2 h-8 rounded-md border px-3 text-sm'
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
