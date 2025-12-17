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

export const WithPopoverTitle: Story = {
  render: () => (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle
          popoverTitle="Card Information"
          popoverContent={
            <div className="space-y-2">
              <p>
                This card displays user analytics data. Click on the title to see more details.
              </p>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Created:</span>
                  <span>January 15, 2024</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>March 22, 2024</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-green-600">Active</span>
                </div>
              </div>
            </div>
          }
        >
          Analytics Dashboard
        </CardTitle>
        <CardDescription>Click the title to view card details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Users</p>
            <p className="text-2xl font-bold">12,543</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Active Sessions</p>
            <p className="text-2xl font-bold">3,247</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>View Report</Button>
      </CardFooter>
    </Card>
  ),
};

