import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type HelpSearchFieldProps = {
  value: string
  onValueChange: (value: string) => void
  /** Called when the user presses Enter. */
  onSubmit?: () => void
  placeholder: string
  size?: 'default' | 'lg'
  inputRef?: React.RefObject<HTMLInputElement | null>
  className?: string
}

const typingTargets = ['INPUT', 'TEXTAREA', 'SELECT']
const overlaySelector = '[role="dialog"], [role="menu"], [role="listbox"]'

export function HelpSearchField({
  value,
  onValueChange,
  onSubmit,
  placeholder,
  size = 'default',
  inputRef,
  className,
}: HelpSearchFieldProps) {
  const localRef = useRef<HTMLInputElement>(null)
  const ref = inputRef ?? localRef
  const large = size === 'lg'

  // "/" moves focus to the search field, unless the user is typing somewhere
  // or a menu or dialog is open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== '/' ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return
      }
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          typingTargets.includes(target.tagName) ||
          target.closest(overlaySelector))
      ) {
        return
      }
      event.preventDefault()
      ref.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [ref])

  return (
    <form
      role='search'
      className={cn('relative w-full', className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <Search
        aria-hidden='true'
        className={cn(
          'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2',
          large ? 'start-5 size-5' : 'start-3 size-4'
        )}
      />
      <Input
        ref={ref}
        type='search'
        enterKeyHint='search'
        aria-label='Search articles'
        aria-keyshortcuts='/'
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn(
          'bg-background [&::-webkit-search-cancel-button]:appearance-none',
          large
            ? 'h-14 rounded-xl ps-13 pe-12 text-base shadow-sm md:text-base'
            : 'ps-9 pe-10'
        )}
      />
      {!value && (
        <kbd
          aria-hidden='true'
          className={cn(
            'bg-muted text-muted-foreground pointer-events-none absolute top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-sm border px-1.5 font-mono text-[10px] font-medium select-none sm:flex',
            large ? 'end-3' : 'end-2'
          )}
        >
          /
        </kbd>
      )}
    </form>
  )
}
