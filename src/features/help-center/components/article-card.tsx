import { Link } from '@tanstack/react-router'
import { type HelpArticle } from '../data/articles'
import { formatReadingTime } from '../data/utils'

type ArticleCardProps = {
  article: HelpArticle
}

/**
 * A related-article card: title, summary and one quiet meta item (reading
 * time). The topic is not shown: related articles share the topic of the
 * article above them, and its header already shows it.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to='/help-center/$slug'
      params={{ slug: article.slug }}
      className='bg-card hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 grid h-full grid-cols-[minmax(0,1fr)_auto] content-start items-baseline gap-x-3 gap-y-2 rounded-xl border p-5 shadow-xs transition-colors outline-none focus-visible:ring-[3px]'
    >
      <h3 className='font-semibold tracking-tight break-words'>
        {article.title}
      </h3>
      <span className='text-muted-foreground shrink-0 text-xs'>
        {formatReadingTime(article.readingMinutes)}
      </span>
      <p className='text-muted-foreground col-span-2 text-sm'>
        {article.summary}
      </p>
    </Link>
  )
}
