import { Link } from '@tanstack/react-router'
import { ArrowLeft, FileX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/**
 * Shown when an article link leads nowhere.
 *
 * It looks like the shared `EmptyResults` block but is not a search result:
 * it has its own title, icon and a link back instead of a clear button.
 * `EmptyResults` cannot express those yet. When it can, use it here.
 */
export function ArticleNotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 px-6 py-14 text-center',
        className
      )}
    >
      <div
        aria-hidden='true'
        className='bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg'
      >
        <FileX className='size-4' />
      </div>
      <div className='flex flex-col items-center gap-1'>
        <p className='text-base font-semibold'>This article isn’t available</p>
        <p className='text-muted-foreground text-sm'>
          The link may be old, or the article was renamed. Search above, or go
          back to all articles.
        </p>
      </div>
      <Button asChild variant='outline' size='sm'>
        <Link to='/help-center'>
          <ArrowLeft aria-hidden='true' className='rtl:rotate-180' />
          Back to Help Center
        </Link>
      </Button>
    </div>
  )
}
