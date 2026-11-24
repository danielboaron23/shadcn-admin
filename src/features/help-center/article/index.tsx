import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi, Link } from '@tanstack/react-router'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ArticleCard } from '../components/article-card'
import { ArticleNotFound } from '../components/article-not-found'
import { HelpCenterShell } from '../components/help-center-shell'
import { HelpHero } from '../components/help-hero'
import { HelpSearchField } from '../components/help-search-field'
import { type HelpCategoryId } from '../data/articles'
import { helpContentQueryOptions } from '../data/queries'
import {
  countByTopic,
  formatReadTime,
  formatUpdatedAt,
  getRelatedArticles,
} from '../data/utils'

const route = getRouteApi('/_authenticated/help-center/$slug')

export function HelpArticle() {
  const { slug } = route.useParams()
  const navigate = route.useNavigate()
  const { data } = useQuery({ ...helpContentQueryOptions, throwOnError: true })
  const [query, setQuery] = useState('')

  // Search and topics live on the main page, so both lead back there.
  const openHelpCenter = (search: { q?: string; topic?: HelpCategoryId }) => {
    navigate({ to: '/help-center', search })
  }
  const submitSearch = (value: string) => {
    openHelpCenter({ q: value.trim() || undefined })
  }

  const article = data?.articles.find((a) => a.slug === slug)

  if (data && !article) {
    return (
      <HelpCenterShell>
        <HelpHero
          articleCount={data.articles.length}
          categories={data.categories}
          counts={countByTopic(data.articles)}
          query={query}
          onQueryChange={setQuery}
          onQuerySubmit={submitSearch}
          onTopicChange={(topic) => openHelpCenter({ topic })}
        />
        <ArticleNotFound className='w-full max-w-220 md:mt-4' />
      </HelpCenterShell>
    )
  }

  const topic = data?.categories.find((c) => c.id === article?.categoryId)
  const related =
    data && article ? getRelatedArticles(article, data.articles) : []

  return (
    <HelpCenterShell>
      <div className='flex w-full max-w-220 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <Button asChild variant='ghost' className='self-start'>
          <Link to='/help-center'>
            <ArrowLeft aria-hidden='true' className='rtl:rotate-180' />
            Back to Help Center
          </Link>
        </Button>
        <HelpSearchField
          className='sm:w-80'
          value={query}
          onValueChange={setQuery}
          onSubmit={submitSearch}
        />
      </div>

      {!article ? (
        <ArticleSkeleton />
      ) : (
        <article className='flex w-full max-w-220 flex-col gap-6'>
          <header className='flex flex-col gap-3'>
            <h1 className='text-3xl font-bold tracking-tight'>
              {article.title}
            </h1>
            <p className='text-muted-foreground text-lg'>{article.summary}</p>
            <div className='text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-sm'>
              {topic && <Badge variant='secondary'>{topic.title}</Badge>}
              <span className='flex items-center gap-1.5'>
                <CalendarDays className='size-4' aria-hidden='true' />
                <span>
                  Updated{' '}
                  <time dateTime={article.updatedAt}>
                    {formatUpdatedAt(article.updatedAt)}
                  </time>
                </span>
              </span>
              <span className='flex items-center gap-1.5'>
                <Clock className='size-4' aria-hidden='true' />
                {formatReadTime(article.readingMinutes)}
              </span>
            </div>
          </header>

          <Separator />

          <div className='flex flex-col gap-4 leading-7'>
            {article.body.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {related.length > 0 && (
            <>
              <Separator />
              <section
                aria-labelledby='related-articles'
                className='flex flex-col gap-6'
              >
                <h2
                  id='related-articles'
                  className='text-lg font-semibold tracking-tight'
                >
                  Related articles
                </h2>
                <ul className='grid gap-4 md:grid-cols-2'>
                  {related.map((item) => (
                    <li key={item.slug}>
                      <ArticleCard article={item} />
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </article>
      )}
    </HelpCenterShell>
  )
}

/** Placeholder shown while the article loads. */
function ArticleSkeleton() {
  return (
    <div className='flex w-full max-w-220 flex-col gap-6'>
      <p role='status' className='sr-only'>
        Loading…
      </p>
      <div aria-hidden='true' className='flex flex-col gap-3'>
        <Skeleton className='h-9 w-2/3 max-w-80' />
        <Skeleton className='h-5 w-full max-w-140 rounded-full' />
        <Skeleton className='h-5 w-72 max-w-full rounded-full' />
      </div>
      <Separator />
      <div aria-hidden='true' className='flex flex-col gap-3'>
        <Skeleton className='h-4 w-full rounded-full' />
        <Skeleton className='h-4 w-11/12 rounded-full' />
        <Skeleton className='h-4 w-3/4 rounded-full' />
      </div>
    </div>
  )
}
