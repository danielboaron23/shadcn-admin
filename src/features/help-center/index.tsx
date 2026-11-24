import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyResults } from '@/components/empty-results'
import { ArticleList, ArticleListSkeleton } from './components/article-list'
import { HelpCenterShell } from './components/help-center-shell'
import { HelpHero } from './components/help-hero'
import { type HelpCategoryId } from './data/articles'
import { helpContentQueryOptions } from './data/queries'
import {
  countByTopic,
  filterArticles,
  pluralize,
  sortByTopic,
} from './data/utils'

const route = getRouteApi('/_authenticated/help-center/')

export function HelpCenter() {
  const { q = '', topic } = route.useSearch()
  const navigate = route.useNavigate()
  const { data } = useQuery({ ...helpContentQueryOptions, throwOnError: true })

  // While the field has focus it shows what the person typed, so the caret
  // never jumps. On blur it goes back to showing what the URL says.
  const [draft, setDraft] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const query = draft ?? q
  const term = query.trim()

  const activeTopic = data?.categories.find((c) => c.id === topic)
  const results = data
    ? filterArticles(sortByTopic(data.articles, data.categories), {
        query: term,
        topic: activeTopic?.id,
      })
    : []
  const count = results.length
  const topicTitles = Object.fromEntries(
    (data?.categories ?? []).map((c) => [c.id, c.title])
  )

  const setQuery = (value: string) => {
    setDraft(value)
    navigate({
      search: (prev) => ({ ...prev, q: value || undefined }),
      replace: true,
    })
  }

  const setTopic = (id: HelpCategoryId | undefined) => {
    navigate({ search: (prev) => ({ ...prev, topic: id }), replace: true })
  }

  const resetAll = () => {
    setDraft(null)
    navigate({ search: {}, replace: true })
    // The reset button disappears with the empty state, so give focus a home.
    searchInputRef.current?.focus()
  }

  const heading = term
    ? pluralize(count, 'result')
    : (activeTopic?.title ?? 'All articles')

  return (
    <HelpCenterShell>
      <HelpHero
        articleCount={data?.articles.length}
        categories={data?.categories}
        counts={data ? countByTopic(data.articles) : {}}
        query={query}
        onQueryChange={setQuery}
        onQueryBlur={() => setDraft(null)}
        searchInputRef={searchInputRef}
        topic={activeTopic?.id}
        onTopicChange={setTopic}
      />

      <section
        aria-labelledby='help-center-results'
        aria-busy={!data}
        className='flex w-full max-w-220 flex-col gap-3 md:mt-4'
      >
        <div className='flex items-center gap-4'>
          <h2
            id='help-center-results'
            className='flex-1 text-lg font-semibold tracking-tight'
          >
            {heading}
          </h2>
          <p className='text-muted-foreground min-w-0 truncate text-sm'>
            {!data ? (
              'Loading…'
            ) : term ? (
              <>
                {activeTopic && `in ${activeTopic.title} `}for “
                <bdi>{term}</bdi>”
              </>
            ) : (
              <>
                {count}
                <span className='max-md:sr-only'>
                  {count === 1 ? ' article' : ' articles'}
                  {!activeTopic && ' · A–Z by topic'}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Tells screen readers how many results the search found. */}
        <p role='status' className='sr-only'>
          {data && term && count > 0
            ? `${pluralize(count, 'result')}${activeTopic ? ` in ${activeTopic.title}` : ''} for “${term}”`
            : ''}
        </p>

        {!data ? (
          <ArticleListSkeleton />
        ) : (
          count > 0 && (
            <ArticleList
              articles={results}
              topicTitles={topicTitles}
              showTopic={!activeTopic}
            />
          )
        )}

        <EmptyResults
          show={!!data && count === 0}
          title={
            term ? (
              <>
                No articles match “<bdi>{term}</bdi>”
                {activeTopic && ` in ${activeTopic.title}`}
              </>
            ) : (
              `No articles in ${activeTopic?.title ?? 'this topic'} yet`
            )
          }
          description={
            term
              ? activeTopic
                ? 'Try another word, or search all topics. Clearing resets the search and the topic filter.'
                : 'Try another word.'
              : undefined
          }
          action={
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={resetAll}
            >
              <RotateCcw aria-hidden='true' />
              {term ? 'Clear search and filters' : 'Show all articles'}
            </Button>
          }
        />
      </section>
    </HelpCenterShell>
  )
}
