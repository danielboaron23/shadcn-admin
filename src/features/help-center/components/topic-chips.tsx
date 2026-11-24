import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { type HelpCategory, type HelpCategoryId } from '../data/articles'

type TopicChipsProps = {
  /** Leave undefined while the topics are loading. */
  categories?: HelpCategory[]
  counts: Partial<Record<HelpCategoryId, number>>
  total: number
  /** Undefined means "All". */
  value?: HelpCategoryId
  onValueChange: (value: HelpCategoryId | undefined) => void
  className?: string
}

// `relative` keeps the screen-reader-only counts inside the scrolling row, so
// they cannot widen the page on small screens.
const chipRowClass =
  'no-scrollbar relative -m-1 flex max-w-full gap-2 overflow-x-auto p-1 md:flex-wrap md:justify-center md:overflow-visible'

export function TopicChips({
  categories,
  counts,
  total,
  value,
  onValueChange,
  className,
}: TopicChipsProps) {
  if (!categories) {
    return (
      <div aria-hidden='true' className={cn(chipRowClass, className)}>
        <Skeleton className='h-8 w-14 shrink-0' />
        <Skeleton className='h-8 w-36 shrink-0' />
        <Skeleton className='h-8 w-38 shrink-0' />
        <Skeleton className='h-8 w-40 shrink-0' />
        <Skeleton className='h-8 w-44 shrink-0' />
      </div>
    )
  }

  const chips: { id: HelpCategoryId | undefined; label: string; n: number }[] =
    [
      { id: undefined, label: 'All', n: total },
      ...categories.map((category) => ({
        id: category.id,
        label: category.title,
        n: counts[category.id] ?? 0,
      })),
    ]

  return (
    <div
      role='group'
      aria-label='Filter by topic'
      className={cn(chipRowClass, className)}
    >
      {chips.map((chip) => {
        const selected = chip.id === value

        return (
          <Button
            key={chip.id ?? 'all'}
            type='button'
            size='sm'
            variant={selected ? 'default' : 'outline'}
            aria-pressed={selected}
            onClick={(event) => {
              onValueChange(chip.id)
              // On small screens the row scrolls; keep the chosen chip in view.
              event.currentTarget.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            {chip.label}{' '}
            <span
              className={cn(
                'text-xs font-normal',
                !selected && 'text-muted-foreground'
              )}
            >
              {chip.n}
              <span className='sr-only'>
                {chip.n === 1 ? ' article' : ' articles'}
              </span>
            </span>
          </Button>
        )
      })}
    </div>
  )
}
