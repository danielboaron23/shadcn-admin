import { useRef, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { type HelpCategoryId, helpArticles } from '../data/articles'
import { filterArticles, getCategory } from '../data/helpers'
import { ArticleList } from './article-list'
import { CategoryChips } from './category-chips'
import { HelpSearchField } from './help-search-field'
import { NoResults } from './no-results'
import { PopularArticles } from './popular-articles'

const route = getRouteApi('/_authenticated/help-center/')

const HEADING_ID = 'help-center-heading'

export function HelpCenterHome() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const chipFocusRef = useRef<HelpCategoryId | null>(null)

  // The URL is the source of truth. The field keeps its own copy of the text
  // so typing stays smooth while the URL catches up, and follows the URL again
  // when it changes from outside (back/forward, a shared link).
  const urlQuery = search.q ?? ''
  const [value, setValue] = useState(urlQuery)
  const [pendingQuery, setPendingQuery] = useState<string | null>(null)
  if (pendingQuery !== null) {
    if (urlQuery === pendingQuery) setPendingQuery(null)
  } else if (urlQuery !== value) {
    setValue(urlQuery)
  }

  const query = urlQuery.trim()
  const isSearching = query.length > 0
  const category = search.category ? getCategory(search.category) : undefined
  const articles = filterArticles(query, category?.id)
  const resultCount = `${articles.length} ${
    articles.length === 1 ? 'result' : 'results'
  } for “${query}”`

  const handleQueryChange = (next: string) => {
    setValue(next)
    setPendingQuery(next)
    navigate({
      replace: true,
      search: (prev) => ({
        ...prev,
        q: next || undefined,
        // Search looks across every topic, so typing leaves the topic filter.
        category: next.trim() ? undefined : prev.category,
      }),
    })
  }

  const handleClear = () => {
    handleQueryChange('')
    inputRef.current?.focus()
  }

  const handleCategoryToggle = (id: HelpCategoryId) => {
    // While searching, the chips sit under the results; picking one moves
    // them back under the search field. Hand focus over to the new chip.
    if (isSearching) chipFocusRef.current = id
    setValue('')
    setPendingQuery('')
    navigate({
      search: (prev) => ({
        ...prev,
        q: undefined,
        category: prev.category === id ? undefined : id,
      }),
    })
  }

  const renderChips = (className: string) => (
    <CategoryChips
      selected={category?.id}
      onToggle={handleCategoryToggle}
      focusOnMountRef={chipFocusRef}
      className={className}
    />
  )

  return (
    <div
      className={cn(
        'flex w-full max-w-180 flex-col items-center transition-[padding] duration-200 motion-reduce:transition-none',
        isSearching ? 'pt-8 sm:pt-16' : 'pt-10 sm:pt-24'
      )}
    >
      <p className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
        Help Center
      </p>
      <h1
        id={HEADING_ID}
        className='mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl'
      >
        How can we help?
      </h1>
      <p className='text-muted-foreground mt-2 mb-7 text-center text-base'>
        Search {helpArticles.length} articles, or start from a topic.
      </p>
      <HelpSearchField
        value={value}
        onChange={handleQueryChange}
        onClear={handleClear}
        inputRef={inputRef}
        labelledBy={HEADING_ID}
      />

      {/* Always mounted, so screen readers hear the count change while typing.
          The visible count below is the same text, hidden from them. */}
      <p role='status' className='sr-only'>
        {isSearching ? resultCount : ''}
      </p>

      {isSearching ? (
        <div
          key='results'
          className='mt-8 flex w-full flex-col items-start gap-3'
        >
          <p
            aria-hidden='true'
            className='text-muted-foreground max-w-full text-sm wrap-break-word'
          >
            {resultCount}
          </p>
          {articles.length > 0 ? (
            <ArticleList articles={articles} />
          ) : (
            <NoResults query={query} onClear={handleClear} />
          )}
          {renderChips('mt-5')}
        </div>
      ) : (
        <div key='browse' className='flex w-full flex-col items-center'>
          {renderChips('mt-5 justify-center')}
          <div className='mt-10 w-full sm:mt-18'>
            {category ? (
              <section
                aria-labelledby='help-category-heading'
                className='flex w-full flex-col gap-3'
              >
                <div className='text-sm'>
                  <h2
                    id='help-category-heading'
                    className='text-muted-foreground font-semibold'
                  >
                    {category.title}
                  </h2>
                  <p className='text-muted-foreground'>
                    {category.description}
                  </p>
                </div>
                <ArticleList articles={articles} />
              </section>
            ) : (
              <PopularArticles />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
