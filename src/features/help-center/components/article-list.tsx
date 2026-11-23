import { Link } from '@tanstack/react-router'
import { ChevronRight, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { type HelpArticle } from '../data/articles'
import { formatReadingTime, getCategoryTitle } from '../data/utils'

type ArticleListProps = {
  articles: HelpArticle[]
}

/**
 * Stacked cards when the content area is narrow, one bordered list of rows
 * when it is wide. Uses the `content` container so the sidebar is accounted for.
 */
export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className='@2xl/content:bg-card flex flex-col gap-3 @2xl/content:gap-0 @2xl/content:divide-y @2xl/content:overflow-hidden @2xl/content:rounded-xl @2xl/content:border @2xl/content:shadow-sm'>
      {articles.map((article) => {
        const category = getCategoryTitle(article.categoryId)
        const readingTime = formatReadingTime(article.readingMinutes)

        return (
          <li key={article.slug}>
            <Link
              to='/help-center/$slug'
              params={{ slug: article.slug }}
              className='bg-card hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 flex flex-col gap-2 rounded-xl border p-5 shadow-xs transition-colors outline-none focus-visible:ring-[3px] @2xl/content:min-h-25 @2xl/content:flex-row @2xl/content:items-center @2xl/content:gap-4 @2xl/content:rounded-none @2xl/content:border-0 @2xl/content:px-4 @2xl/content:py-3.5 @2xl/content:shadow-none @2xl/content:focus-visible:ring-inset'
            >
              <span className='bg-muted hidden size-8 shrink-0 items-center justify-center rounded-md @2xl/content:flex'>
                <FileText
                  aria-hidden='true'
                  className='text-muted-foreground size-4'
                />
              </span>

              {/* Narrow layout: category and reading time sit above the title. */}
              <span className='text-muted-foreground flex items-center justify-between gap-3 text-xs @2xl/content:hidden'>
                <span className='font-medium'>{category}</span>
                <span className='shrink-0'>{readingTime}</span>
              </span>

              <span className='flex min-w-0 flex-1 flex-col gap-2 @2xl/content:gap-0.5'>
                <span className='font-semibold tracking-tight break-words @2xl/content:text-sm @2xl/content:font-medium @2xl/content:tracking-normal'>
                  {article.title}
                </span>
                <span className='text-muted-foreground text-sm'>
                  {article.summary}
                </span>
              </span>

              {/* Wide layout: category and reading time sit at the end of the row. */}
              <Badge
                variant='outline'
                className='hidden @2xl/content:inline-flex'
              >
                {category}
              </Badge>
              <span className='text-muted-foreground hidden shrink-0 text-xs @2xl/content:block'>
                {readingTime}
              </span>
              <ChevronRight
                aria-hidden='true'
                className='text-muted-foreground hidden size-4 shrink-0 @2xl/content:block rtl:rotate-180'
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
