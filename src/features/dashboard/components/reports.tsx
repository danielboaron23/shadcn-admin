import { BarChart3Icon } from 'lucide-react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export function Reports() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardContent className='flex flex-col items-center justify-center gap-2 py-16 text-center'>
          <BarChart3Icon
            className='text-muted-foreground h-10 w-10'
            aria-hidden='true'
          />
          <h3 className='text-lg font-medium'>Reports — coming soon</h3>
          <p className='text-muted-foreground max-w-sm text-sm'>
            The Reports tab is being rolled out in a series of PRs. Date-range,
            KPIs, charts, and the detail table will land in the next merges.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
