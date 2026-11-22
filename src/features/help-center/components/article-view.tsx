import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { type HelpArticle } from '../data/articles'
import {
  formatReadingTime,
  formatUpdatedAt,
  getCategory,
  getRelatedArticles,
} from '../data/helpers'
import { ArticleList } from './article-list'

type ArticleViewProps = {
  article: HelpArticle
}

export function ArticleView({ article }: ArticleViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const category = getCategory(article.categoryId)
  const related = getRelatedArticles(article)

  // Opening an article swaps the page content in place, so start it at the
  // top and move keyboard and screen reader focus to its title.
  useEffect(() => {
    window.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [article.slug])

  return (
    <article className='flex w-full max-w-180 flex-col items-start pt-8'>
      <Button asChild variant='ghost'>
        <Link
          to='/help-center'
          search={(prev) => ({ ...prev, article: undefined })}
        >
          <ArrowLeft aria-hidden='true' className='rtl:rotate-180' />
          Back to Help Center
        </Link>
      </Button>

      {category && (
        <Badge variant='secondary' className='mt-6'>
          {category.title}
        </Badge>
      )}
      <h1
        ref={headingRef}
        tabIndex={-1}
        className='mt-3 text-3xl font-bold tracking-tight wrap-break-word outline-none'
      >
        {article.title}
      </h1>
      <div className='text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm'>
        <span className='flex items-center gap-1.5'>
          <Calendar aria-hidden='true' className='size-4' />
          <span>
            Updated{' '}
            <time dateTime={article.updatedAt}>
              {formatUpdatedAt(article.updatedAt)}
            </time>
          </span>
        </span>
        <span className='flex items-center gap-1.5'>
          <Clock aria-hidden='true' className='size-4' />
          {formatReadingTime(article.readingMinutes)}
        </span>
      </div>

      <Separator className='my-6' />

      <div className='flex flex-col gap-4 text-base leading-7'>
        {article.body.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section
          aria-labelledby='help-related-heading'
          className='mt-10 flex w-full flex-col gap-3'
        >
          <h2
            id='help-related-heading'
            className='text-muted-foreground text-sm font-semibold'
          >
            Related articles
          </h2>
          <ArticleList articles={related} />
        </section>
      )}
    </article>
  )
}
