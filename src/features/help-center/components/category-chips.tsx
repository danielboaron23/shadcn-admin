import { useEffect, useId, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type HelpCategoryId, helpCategories } from '../data/articles'

type CategoryChipsProps = {
  selected?: HelpCategoryId
  onToggle: (id: HelpCategoryId) => void
  /**
   * Set to a category id right before the chips move to another place on the
   * page. The newly mounted chips then take focus, so keyboard users keep
   * their place.
   */
  focusOnMountRef: React.RefObject<HelpCategoryId | null>
  className?: string
}

export function CategoryChips({
  selected,
  onToggle,
  focusOnMountRef,
  className,
}: CategoryChipsProps) {
  const labelId = useId()
  const groupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = focusOnMountRef.current
    if (!id) return
    focusOnMountRef.current = null
    groupRef.current
      ?.querySelector<HTMLButtonElement>(`[data-category='${id}']`)
      ?.focus()
  }, [focusOnMountRef])

  return (
    <div
      ref={groupRef}
      role='group'
      aria-labelledby={labelId}
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      <span id={labelId} className='text-muted-foreground text-sm'>
        Or browse:
      </span>
      {helpCategories.map((category) => {
        const isSelected = category.id === selected
        return (
          <Button
            key={category.id}
            type='button'
            size='sm'
            variant={isSelected ? 'default' : 'outline'}
            aria-pressed={isSelected}
            data-category={category.id}
            onClick={() => onToggle(category.id)}
          >
            {category.title}
          </Button>
        )
      })}
    </div>
  )
}
