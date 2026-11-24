import { type LucideIcon, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyResultsProps = {
  /**
   * False hides the block but keeps its status region on the page.
   * Screen readers only announce a status region reliably when it exists
   * before its text appears, so keep the component mounted and toggle this.
   */
  show?: boolean
  /** Defaults to the "search found nothing" icon. */
  icon?: LucideIcon
  title: React.ReactNode
  /** One or two lines of help under the title. */
  description?: React.ReactNode
  /** Usually one small outline button that resets the search and filters. */
  action?: React.ReactNode
  className?: string
}

/**
 * Shown when a search or filter matches nothing, or a link leads nowhere.
 * Not for the first-use state, where a list has no data at all.
 */
export function EmptyResults({
  show = true,
  icon: Icon = SearchX,
  title,
  description,
  action,
  className,
}: EmptyResultsProps) {
  return (
    <div
      data-slot='empty-results'
      className={cn(
        show && 'flex flex-col items-center gap-3 px-6 py-14 text-center',
        show && className
      )}
    >
      {show && (
        <div className='bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg'>
          <Icon className='size-4' aria-hidden='true' />
        </div>
      )}
      <div role='status' className='flex w-full flex-col gap-1'>
        {show && (
          <>
            <p className='text-base font-semibold break-words'>{title}</p>
            {description && (
              <p className='text-muted-foreground text-sm break-words'>
                {description}
              </p>
            )}
          </>
        )}
      </div>
      {show && action}
    </div>
  )
}
