import { useEffect } from 'react'
import { SearchIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type HelpSearchFieldProps = {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
  /** Id of the element that names the field (the page heading). */
  labelledBy: string
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  )
}

export function HelpSearchField({
  value,
  onChange,
  onClear,
  inputRef,
  labelledBy,
}: HelpSearchFieldProps) {
  // "/" jumps to the search field, as the hint inside the field promises.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey)
        return
      if (isTypingTarget(event.target)) return
      // Leave the key alone while a dialog, drawer or the command menu is open.
      if (document.querySelector('[role="dialog"]')) return
      event.preventDefault()
      inputRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [inputRef])

  return (
    <form
      role='search'
      className='relative w-full'
      onSubmit={(event) => event.preventDefault()}
    >
      <SearchIcon
        aria-hidden='true'
        className='text-muted-foreground pointer-events-none absolute start-5 top-1/2 size-5 -translate-y-1/2'
      />
      <Input
        ref={inputRef}
        type='text'
        inputMode='search'
        enterKeyHint='search'
        autoComplete='off'
        spellCheck={false}
        aria-labelledby={labelledBy}
        aria-keyshortcuts='/'
        placeholder='Ask a question or describe the problem'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'bg-background h-14 rounded-xl ps-13 text-base text-ellipsis shadow-sm md:text-base',
          // Room for the clear button, or for the "/" hint from `sm` up.
          value ? 'pe-14' : 'pe-4 sm:pe-14'
        )}
      />
      {value ? (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onClear}
          className='text-muted-foreground absolute end-3 top-1/2 size-8 -translate-y-1/2'
        >
          <X aria-hidden='true' />
          <span className='sr-only'>Clear search</span>
        </Button>
      ) : (
        <kbd
          aria-hidden='true'
          className='bg-muted text-muted-foreground pointer-events-none absolute end-3 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-sm border px-1.5 text-[10px] font-medium select-none sm:flex'
        >
          /
        </kbd>
      )}
    </form>
  )
}
