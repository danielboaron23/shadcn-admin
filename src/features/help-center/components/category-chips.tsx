import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  helpArticles,
  helpCategories,
  type HelpCategoryId,
} from '../data/articles'

type CategoryChipsProps = {
  selected?: HelpCategoryId
  onSelect: (category?: HelpCategoryId) => void
  className?: string
}

/** Scrolls the row sideways, never the page, until the chip is fully visible. */
function revealChip(group: HTMLElement, chip: Element) {
  const groupRect = group.getBoundingClientRect()
  const chipRect = chip.getBoundingClientRect()
  if (chipRect.left < groupRect.left) {
    group.scrollLeft -= groupRect.left - chipRect.left + 4
  } else if (chipRect.right > groupRect.right) {
    group.scrollLeft += chipRect.right - groupRect.right + 4
  }
}

export function CategoryChips({
  selected,
  onSelect,
  className,
}: CategoryChipsProps) {
  const groupRef = useRef<HTMLDivElement>(null)

  // On narrow screens the chips are one scrolling row: keep the selected chip
  // in view, also after the web font loads and the chips change width.
  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    let active = true
    const revealSelected = () => {
      const chip = group.querySelector('[aria-pressed="true"]')
      if (active && chip) revealChip(group, chip)
    }
    revealSelected()
    document.fonts.ready.then(revealSelected)
    return () => {
      active = false
    }
  }, [selected])

  const chips: { id?: HelpCategoryId; label: string; count: number }[] = [
    { label: 'All', count: helpArticles.length },
    ...helpCategories.map((category) => ({
      id: category.id,
      label: category.title,
      count: helpArticles.filter(
        (article) => article.categoryId === category.id
      ).length,
    })),
  ]

  return (
    <div
      ref={groupRef}
      role='group'
      onFocus={(event) => revealChip(event.currentTarget, event.target)}
      aria-label='Filter by topic'
      className={cn(
        // One scrolling row on narrow screens, wrapped and centered from sm up.
        // The padding keeps the focus ring from being clipped by the scroll area;
        // `relative` keeps the screen-reader-only text inside it.
        'relative -mx-1 flex gap-2 overflow-x-auto p-1 sm:max-w-full sm:flex-wrap sm:justify-center sm:overflow-visible',
        className
      )}
    >
      {chips.map((chip) => {
        const isSelected = chip.id === selected
        return (
          <Button
            key={chip.id ?? 'all'}
            type='button'
            size='sm'
            variant={isSelected ? 'default' : 'outline'}
            aria-pressed={isSelected}
            onClick={() => onSelect(chip.id)}
          >
            {chip.label}
            <span
              className={cn(
                'text-xs font-normal',
                isSelected
                  ? 'text-primary-foreground/80'
                  : 'text-muted-foreground'
              )}
            >
              {chip.count}
              <span className='sr-only'> articles</span>
            </span>
          </Button>
        )
      })}
    </div>
  )
}
