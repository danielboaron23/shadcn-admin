import { Link } from '@tanstack/react-router'
import { ChevronRight, FileText } from 'lucide-react'
import { type HelpArticle } from '../data/articles'
import { formatReadingTime } from '../data/utils'

type ArticleListProps = {
  articles: HelpArticle[]
}

/**
 * Stacked cards when the content area is narrow, one bordered list of rows
 * when it is wide. Uses the `content` container so the sidebar is accounted for.
 *
 * A row shows the title, the summary and one quiet meta item (reading time).
 * The topic is not repeated on each row: the chips above the list show it.
 */
export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className='@2xl/content:bg-card flex flex-col gap-3 @2xl/content:gap-0 @2xl/content:divide-y @2xl/content:overflow-hidden @2xl/content:rounded-xl @2xl/content:border @2xl/content:shadow-sm'>
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            to='/help-center/$slug'
            params={{ slug: article.slug }}
            className='bg-card hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-2 rounded-xl border p-5 shadow-xs transition-colors outline-none focus-visible:ring-[3px] @2xl/content:flex @2xl/content:min-h-25 @2xl/content:items-center @2xl/content:gap-4 @2xl/content:rounded-none @2xl/content:border-0 @2xl/content:px-4 @2xl/content:py-3.5 @2xl/content:shadow-none @2xl/content:focus-visible:ring-inset'
          >
            <span className='bg-muted hidden size-8 shrink-0 items-center justify-center rounded-md @2xl/content:flex'>
              <FileText
                aria-hidden='true'
                className='text-muted-foreground size-4'
              />
            </span>

            {/* Narrow: title and summary are placed on the card's grid.
                Wide: they stack in one column that takes the free space. */}
            <span className='contents @2xl/content:flex @2xl/content:min-w-0 @2xl/content:flex-1 @2xl/content:flex-col @2xl/content:gap-0.5'>
              <span className='col-start-1 row-start-1 font-semibold tracking-tight break-words @2xl/content:text-sm @2xl/content:font-medium @2xl/content:tracking-normal'>
                {article.title}
              </span>
              <span className='text-muted-foreground col-span-2 row-start-2 text-sm'>
                {article.summary}
              </span>
            </span>

            <span className='text-muted-foreground col-start-2 row-start-1 shrink-0 text-xs'>
              {formatReadingTime(article.readingMinutes)}
            </span>
            <ChevronRight
              aria-hidden='true'
              className='text-muted-foreground hidden size-4 shrink-0 @2xl/content:block rtl:rotate-180'
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
