import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { type HelpArticle } from '../data/articles'
import { formatReadTime } from '../data/utils'

type ArticleCardProps = {
  article: HelpArticle
  className?: string
}

/**
 * A whole-card link to an article. Used on mobile and for related articles.
 * Shows no topic: the chips or the article header above already do.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link
      to='/help-center/$slug'
      params={{ slug: article.slug }}
      className={cn(
        'group focus-visible:ring-ring/50 block h-full rounded-xl outline-none focus-visible:ring-[3px]',
        className
      )}
    >
      <Card className='group-hover:bg-accent group-focus-visible:border-ring h-full gap-2 p-5 shadow-xs transition-colors'>
        <p className='text-muted-foreground text-xs'>
          {formatReadTime(article.readingMinutes)}
        </p>
        <h3 className='font-semibold tracking-tight'>{article.title}</h3>
        <p className='text-muted-foreground text-sm'>{article.summary}</p>
      </Card>
    </Link>
  )
}
