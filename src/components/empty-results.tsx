import { type LucideIcon, SearchX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type EmptyResultsProps = {
  /** True when a search or filter matches nothing. */
  show: boolean
  /** Defaults to the "search found nothing" icon. */
  icon?: LucideIcon
  title?: string
  /** One line of help under the title. */
  message?: React.ReactNode
  actionLabel?: string
  /** Runs the action, usually resetting the search and filters. */
  onAction: () => void
  /**
   * Draws a solid border around the block. Use it where the block stands on
   * its own; leave it off inside a container that already has a border, such
   * as a table.
   */
  bordered?: boolean
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
  icon: Icon = SearchX,
  title = 'No results',
  message,
  actionLabel = 'Clear search and filters',
  onAction,
  bordered = false,
  className,
}: EmptyResultsProps) {
  return (
    <div
      data-slot='empty-results'
      className={cn(
        show && 'flex flex-col items-center gap-3 px-6 py-14 text-center',
        show && bordered && 'rounded-md border',
        show && className
      )}
    >
      {show && (
        <div className='bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg'>
          <Icon className='size-4' aria-hidden='true' />
        </div>
      )}
      <div role='status' className='flex w-full max-w-md flex-col gap-1'>
        {show && (
          <>
            {/* dir='auto' keeps each line in reading order when the page is RTL. */}
            <p dir='auto' className='text-base font-semibold break-words'>
              {title}
            </p>
            {message && (
              <p
                dir='auto'
                className='text-muted-foreground text-sm break-words'
              >
                {message}
              </p>
            )}
          </>
        )}
      </div>
      {show && (
        <Button type='button' variant='outline' size='sm' onClick={onAction}>
          <X aria-hidden='true' />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

type EmptyResultsMessageProps = {
  /** Plural, lower-case name of what the list holds, for example "tasks". */
  entity: string
  /** The active search text, if there is one. It is named in the message. */
  searchTerm?: string
}

/** The standard `message` for `EmptyResults`. */
export function EmptyResultsMessage({
  entity,
  searchTerm,
}: EmptyResultsMessageProps) {
  const term = searchTerm?.trim()

  return term ? (
    <>
      No {entity} match &quot;<bdi>{term}</bdi>&quot;.
    </>
  ) : (
    <>No {entity} match your search and filters.</>
  )
}
