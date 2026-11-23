import { useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { RotateCcw, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArticleList } from './components/article-list'
import { HelpCenterLayout } from './components/help-center-layout'
import { HelpEmptyState } from './components/help-empty-state'
import { HelpHero } from './components/help-hero'
import { type HelpCategoryId } from './data/articles'
import { findArticles, formatCount, getCategoryTitle } from './data/utils'

const route = getRouteApi('/_authenticated/help-center/')

export function HelpCenter() {
  const { q = '', category } = route.useSearch()
  const navigate = route.useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)

  // What the user typed that has not reached the URL yet. The URL stays the
  // source of truth; the draft only keeps typing smooth while it catches up,
  // and is dropped once the latest write has landed.
  const [draft, setDraft] = useState<string | null>(null)
  const writes = useRef(0)
  const query = draft ?? q

  const writeQuery = (value: string, keepCategory: boolean) => {
    const write = ++writes.current
    setDraft(value)
    navigate({
      search: (prev) => ({
        category: keepCategory ? prev.category : undefined,
        q: value || undefined,
      }),
      replace: keepCategory,
    }).finally(() => {
      if (writes.current === write) setDraft(null)
    })
  }

  const term = query.trim()
  const articles = findArticles(term, category)
  const categoryTitle = category ? getCategoryTitle(category) : undefined

  const handleCategoryChange = (next?: HelpCategoryId) => {
    navigate({ search: (prev) => ({ ...prev, category: next }) })
  }

  const handleReset = () => {
    writeQuery('', false)
    searchRef.current?.focus()
  }

  return (
    <HelpCenterLayout>
      <HelpHero
        searchRef={searchRef}
        query={query}
        onQueryChange={(value) => writeQuery(value, true)}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      <section className='mx-auto flex w-full max-w-4xl flex-col gap-3'>
        <div
          aria-live='polite'
          aria-atomic='true'
          className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'
        >
          <h2 className='text-lg font-semibold tracking-tight'>
            {term
              ? formatCount(articles.length, 'result')
              : (categoryTitle ?? 'All articles')}
          </h2>
          <p className='text-muted-foreground min-w-0 text-sm break-words'>
            {term
              ? `${categoryTitle ? `in ${categoryTitle} ` : ''}for “${term}”`
              : formatCount(articles.length, 'article')}
          </p>
        </div>

        {articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : term ? (
          <HelpEmptyState
            icon={SearchX}
            title={`No articles match “${term}”${categoryTitle ? ` in ${categoryTitle}` : ''}`}
            description='Try another word, or search all topics. Clearing resets the search and the topic filter.'
          >
            <Button variant='outline' onClick={handleReset}>
              <RotateCcw aria-hidden='true' />
              Clear search and filters
            </Button>
          </HelpEmptyState>
        ) : (
          <HelpEmptyState
            icon={SearchX}
            title={`No articles in ${categoryTitle} yet`}
          >
            <Button variant='outline' onClick={handleReset}>
              Show all articles
            </Button>
          </HelpEmptyState>
        )}
      </section>
    </HelpCenterLayout>
  )
}
