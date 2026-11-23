import { useEffect, useState } from 'react'
import { getRouteApi, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Clock, FileX } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArticleCard } from '../components/article-card'
import { HelpCenterLayout } from '../components/help-center-layout'
import { HelpEmptyState } from '../components/help-empty-state'
import { HelpHero } from '../components/help-hero'
import { HelpSearchField } from '../components/help-search-field'
import { type HelpArticle, type HelpCategoryId } from '../data/articles'
import {
  formatReadingTime,
  formatUpdatedAt,
  getArticle,
  getCategoryTitle,
  getRelatedArticles,
} from '../data/utils'

const route = getRouteApi('/_authenticated/help-center/$slug')

export function HelpArticle() {
  const { slug } = route.useParams()
  const article = getArticle(slug)

  // Start each article at the top, also when coming from a long list.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  return (
    <HelpCenterLayout>
      {article ? (
        <ArticleView key={article.slug} article={article} />
      ) : (
        <ArticleNotFound />
      )}
    </HelpCenterLayout>
  )
}

/** Search from an article page: Enter opens the list with the query applied. */
function useListSearch() {
  const navigate = route.useNavigate()
  const [query, setQuery] = useState('')

  const openList = (category?: HelpCategoryId) => {
    navigate({
      to: '/help-center',
      search: { q: query.trim() || undefined, category },
    })
  }

  return { query, setQuery, openList }
}

function BackToHelpCenter({ variant }: { variant: 'ghost' | 'outline' }) {
  return (
    <Button variant={variant} asChild>
      <Link to='/help-center'>
        <ArrowLeft aria-hidden='true' className='rtl:rotate-180' />
        Back to Help Center
      </Link>
    </Button>
  )
}

function ArticleView({ article }: { article: HelpArticle }) {
  const { query, setQuery, openList } = useListSearch()
  const related = getRelatedArticles(article)

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <BackToHelpCenter variant='ghost' />
        <HelpSearchField
          className='sm:w-80'
          value={query}
          onValueChange={setQuery}
          onSubmit={() => openList()}
          placeholder='Search articles…'
        />
      </div>

      <article className='flex flex-col gap-6'>
        <header className='flex flex-col gap-3'>
          <h1 className='text-3xl font-bold tracking-tight break-words'>
            {article.title}
          </h1>
          <p className='text-muted-foreground text-lg'>{article.summary}</p>
          <div className='text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-2 text-sm'>
            <Badge variant='secondary'>
              {getCategoryTitle(article.categoryId)}
            </Badge>
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
        </header>

        <Separator />

        <div className='flex flex-col gap-4 leading-7'>
          {article.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <>
          <Separator />
          <section className='flex flex-col gap-6'>
            <h2 className='text-lg font-semibold tracking-tight'>
              Related articles
            </h2>
            <ul className='grid gap-4 sm:grid-cols-2'>
              {related.map((item) => (
                <li key={item.slug} className='min-w-0'>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}

function ArticleNotFound() {
  const { query, setQuery, openList } = useListSearch()

  return (
    <>
      <HelpHero
        query={query}
        onQueryChange={setQuery}
        onQuerySubmit={() => openList()}
        onCategoryChange={openList}
      />
      <div className='mx-auto w-full max-w-4xl'>
        <HelpEmptyState
          icon={FileX}
          headingLevel='h2'
          title='This article isn’t available'
          description='The link may be old, or the article was renamed. Search above, or go back to all articles.'
        >
          <BackToHelpCenter variant='outline' />
        </HelpEmptyState>
      </div>
    </>
  )
}
