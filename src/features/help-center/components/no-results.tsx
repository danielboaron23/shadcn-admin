import { SearchX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type NoResultsProps = {
  query: string
  onClear: () => void
}

export function NoResults({ query, onClear }: NoResultsProps) {
  return (
    <Card className='w-full items-center gap-0 border-dashed bg-transparent px-8 py-12 text-center shadow-none'>
      <span
        aria-hidden='true'
        className='bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-lg'
      >
        <SearchX className='size-6' />
      </span>
      <h2 className='mt-4 text-lg font-semibold tracking-tight'>
        No matching articles
      </h2>
      <p className='text-muted-foreground mt-1.5 max-w-95 text-sm wrap-break-word'>
        Nothing matches “{query}”. Check the spelling, or try a broader word
        like “plan” or “invoice”.
      </p>
      <Button variant='outline' className='mt-5' onClick={onClear}>
        <X aria-hidden='true' />
        Clear search
      </Button>
    </Card>
  )
}
