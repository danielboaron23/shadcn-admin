import { type LucideIcon } from 'lucide-react'

type HelpEmptyStateProps = {
  icon: LucideIcon
  title: string
  description?: string
  /** Heading level that fits the page outline where the block is used. */
  headingLevel?: 'h2' | 'h3'
  /** The action, usually one button. */
  children?: React.ReactNode
}

export function HelpEmptyState({
  icon: Icon,
  title,
  description,
  headingLevel: Heading = 'h3',
  children,
}: HelpEmptyStateProps) {
  return (
    <div className='flex flex-col items-center gap-4 rounded-xl border border-dashed px-6 py-12 text-center sm:px-8'>
      <div className='bg-muted flex size-12 items-center justify-center rounded-lg'>
        <Icon aria-hidden='true' className='size-6' />
      </div>
      <div className='flex max-w-full flex-col gap-1.5'>
        <Heading className='text-lg font-semibold tracking-tight break-words'>
          {title}
        </Heading>
        {description && (
          <p className='text-muted-foreground text-sm'>{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
