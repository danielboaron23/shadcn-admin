import { SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type EmptyResultsProps = {
  /** True when a search or filter matches nothing. */
  show: boolean
  /** Plural, lower-case name of what the list holds, for example "tasks". */
  entity: string
  /** The active search text, if there is one. It is named in the message. */
  searchTerm?: string
  /** Resets the list's search and filters. */
  onClear: () => void
  className?: string
}

/**
 * Shown when a search or filter matches nothing.
 * Not for the first-use state, where a list has no data at all.
 *
 * Keep it mounted and toggle `show`: screen readers only announce a status
 * region reliably when it is already on the page before its text appears.
 */
export function EmptyResults({
  show,
  entity,
  searchTerm,
  onClear,
  className,
}: EmptyResultsProps) {
  const term = searchTerm?.trim()

  return (
    <div
      data-slot='empty-results'
      className={cn(
        show && 'flex flex-col items-center gap-3 px-6 py-14 text-center',
        className
      )}
    >
      {show && (
        <div className='bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg'>
          <SearchX className='size-4' aria-hidden='true' />
        </div>
      )}
      <div role='status' className='flex w-full max-w-md flex-col gap-1'>
        {show && (
          <>
            <p className='text-base font-semibold'>No results</p>
            {/* dir='auto' keeps the sentence in reading order when the page is RTL. */}
            <p dir='auto' className='text-muted-foreground text-sm break-words'>
              {term ? (
                <>
                  No {entity} match &quot;<bdi>{term}</bdi>&quot;.
                </>
              ) : (
                <>No {entity} match your search and filters.</>
              )}
            </p>
          </>
        )}
      </div>
      {show && (
        <Button type='button' variant='outline' size='sm' onClick={onClear}>
          <X aria-hidden='true' />
          Clear search and filters
        </Button>
      )}
    </div>
  )
}
