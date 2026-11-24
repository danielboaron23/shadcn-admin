import { Link } from '@tanstack/react-router'
import { ChevronRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { type HelpArticle } from '../data/articles'
import { formatReadTime } from '../data/utils'
import { ArticleCard } from './article-card'

/**
 * Rows in one card from `md` up, separate cards below it.
 *
 * Rows show no topic: the chips above the list already do. Next to the title
 * there is one quiet meta item (reading time) and the arrow.
 */
export function ArticleList({ articles }: { articles: HelpArticle[] }) {
  return (
    <>
      <Card className='hidden gap-0 py-0 md:flex'>
        <ul>
          {articles.map((article) => (
            <li key={article.slug} className='border-b last:border-b-0'>
              <ArticleRow article={article} />
            </li>
          ))}
        </ul>
      </Card>

      <ul className='flex flex-col gap-3 md:hidden'>
        {articles.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </>
  )
}

function ArticleRow({ article }: { article: HelpArticle }) {
  return (
    <Link
      to='/help-center/$slug'
      params={{ slug: article.slug }}
      className={cn(
        'group hover:bg-accent flex min-h-25 items-center gap-4 px-4 py-3.5 transition-colors outline-none',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset',
        '[li:first-child>&]:rounded-t-xl [li:last-child>&]:rounded-b-xl'
      )}
    >
      <span className='bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md'>
        <FileText className='size-4' aria-hidden='true' />
      </span>
      <div className='flex min-w-0 flex-1 flex-col gap-0.5 text-sm'>
        <h3 className='truncate font-medium'>{article.title}</h3>
        <p className='text-muted-foreground truncate'>{article.summary}</p>
      </div>
      <span className='text-muted-foreground text-xs whitespace-nowrap'>
        {formatReadTime(article.readingMinutes)}
      </span>
      <ChevronRight
        aria-hidden='true'
        className='text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors rtl:rotate-180'
      />
    </Link>
  )
}

const skeletonRows = [
  { title: 'w-55', summary: 'w-110' },
  { title: 'w-45', summary: 'w-95' },
  { title: 'w-65', summary: 'w-118' },
  { title: 'w-50', summary: 'w-90' },
  { title: 'w-60', summary: 'w-105' },
  { title: 'w-42', summary: 'w-100' },
]

/** Placeholder rows shown while the articles load. */
export function ArticleListSkeleton() {
  return (
    <div aria-hidden='true' className='rounded-lg border'>
      {skeletonRows.map((row, index) => (
        <div
          key={index}
          className='flex items-center gap-3 border-b p-4 last:border-b-0'
        >
          <Skeleton className='size-8 shrink-0' />
          <div className='flex min-w-0 flex-1 flex-col gap-2'>
            <Skeleton
              className={cn('h-3.5 max-w-full rounded-full', row.title)}
            />
            <Skeleton
              className={cn('h-3 max-w-full rounded-full', row.summary)}
            />
          </div>
          <Skeleton className='hidden h-5 w-24 shrink-0 rounded-full sm:block' />
        </div>
      ))}
    </div>
  )
}
