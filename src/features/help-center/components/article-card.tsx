import { Link } from '@tanstack/react-router'
import { type HelpArticle } from '../data/articles'
import { formatReadingTime, getCategoryTitle } from '../data/utils'

type ArticleCardProps = {
  article: HelpArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to='/help-center/$slug'
      params={{ slug: article.slug }}
      className='bg-card hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 flex h-full flex-col gap-2 rounded-xl border p-5 shadow-xs transition-colors outline-none focus-visible:ring-[3px]'
    >
      <span className='text-muted-foreground flex items-center justify-between gap-3 text-xs'>
        <span className='font-medium'>
          {getCategoryTitle(article.categoryId)}
        </span>
        <span className='shrink-0'>
          {formatReadingTime(article.readingMinutes)}
        </span>
      </span>
      <h3 className='font-semibold tracking-tight break-words'>
        {article.title}
      </h3>
      <p className='text-muted-foreground text-sm'>{article.summary}</p>
    </Link>
  )
}
