import { SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type EmptyResultsProps = {
  /**
   * True when a search or filter matches nothing. Keep the component mounted
   * and toggle this prop, so the status region can announce the change.
   */
  show: boolean
  /** One line that says what happened, for example "No tasks match your search and filters." */
  description: string
  onClear: () => void
  className?: string
}

/**
 * Shown when a search or filter matches nothing. It is not the first-use
 * empty state (a list with no data yet), which is a separate component.
 */
export function EmptyResults({
  show,
  description,
  onClear,
  className,
}: EmptyResultsProps) {
  return (
    <div
      className={cn(
        show && 'flex flex-col items-center gap-3 px-6 py-14',
        show && className
      )}
    >
      {show && (
        <div
          aria-hidden='true'
          className='bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg'
        >
          <SearchX className='size-4' />
        </div>
      )}
      <div
        role='status'
        className={cn(show && 'flex flex-col items-center gap-1 text-center')}
      >
        {show && (
          <>
            <p className='text-foreground text-base font-semibold'>
              No results
            </p>
            {/* dir='auto' keeps the full stop at the end of the sentence in RTL */}
            <p dir='auto' className='text-muted-foreground text-sm'>
              {description}
            </p>
          </>
        )}
      </div>
      {show && (
        <Button
          variant='outline'
          size='sm'
          className='has-[>svg]:px-3'
          onClick={onClear}
        >
          <X aria-hidden='true' />
          Clear search and filters
        </Button>
      )}
    </div>
  )
}
