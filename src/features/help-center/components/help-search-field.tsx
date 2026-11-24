import { useEffect, useId, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type HelpSearchFieldProps = {
  value: string
  onValueChange: (value: string) => void
  /** Runs when the person presses Enter. */
  onSubmit?: (value: string) => void
  onBlur?: () => void
  /** `lg` is the hero field; `default` matches a regular input. */
  size?: 'default' | 'lg'
  placeholder?: string
  /** Lets the page move focus to the field, for example after a reset. */
  inputRef?: React.RefObject<HTMLInputElement | null>
  className?: string
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  )
}

export function HelpSearchField({
  value,
  onValueChange,
  onSubmit,
  onBlur,
  size = 'default',
  placeholder = 'Search articles…',
  inputRef: inputRefProp,
  className,
}: HelpSearchFieldProps) {
  const id = useId()
  const localRef = useRef<HTMLInputElement>(null)
  const inputRef = inputRefProp ?? localRef
  const isLarge = size === 'lg'

  // "/" moves focus to the search field, unless the person is already typing.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/') return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return

      event.preventDefault()
      inputRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [inputRef])

  return (
    <form
      role='search'
      className={cn('relative w-full', className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(value)
      }}
    >
      <label htmlFor={id} className='sr-only'>
        Search articles
      </label>
      <Search
        aria-hidden='true'
        className={cn(
          'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2',
          isLarge ? 'start-5 size-5' : 'start-3 size-4'
        )}
      />
      <Input
        id={id}
        ref={inputRef}
        type='search'
        autoComplete='off'
        aria-keyshortcuts='/'
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        onBlur={onBlur}
        className={cn(
          'bg-background [&::-webkit-search-cancel-button]:appearance-none',
          isLarge
            ? 'h-14 rounded-xl ps-13 pe-12 text-base shadow-sm md:text-base'
            : 'ps-9 pe-9'
        )}
      />
      {value ? (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className={cn(
            'text-muted-foreground absolute top-1/2 -translate-y-1/2',
            isLarge ? 'end-3 size-8' : 'end-1 size-7'
          )}
          onClick={() => {
            onValueChange('')
            inputRef.current?.focus()
          }}
        >
          <X aria-hidden='true' />
          <span className='sr-only'>Clear search</span>
        </Button>
      ) : (
        <kbd
          aria-hidden='true'
          className={cn(
            'bg-muted text-muted-foreground pointer-events-none absolute top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-sm border px-1.5 text-[10px] font-medium select-none md:flex',
            isLarge ? 'end-3' : 'end-2'
          )}
        >
          /
        </kbd>
      )}
    </form>
  )
}
