import { useIsMobile } from '@/hooks/use-mobile'
import { type HelpCategory, type HelpCategoryId } from '../data/articles'
import { HelpSearchField } from './help-search-field'
import { TopicChips } from './topic-chips'

type HelpHeroProps = {
  /** Leave undefined while the content is loading. */
  articleCount?: number
  categories?: HelpCategory[]
  counts: Partial<Record<HelpCategoryId, number>>
  query: string
  onQueryChange: (query: string) => void
  onQuerySubmit?: (query: string) => void
  onQueryBlur?: () => void
  searchInputRef?: React.RefObject<HTMLInputElement | null>
  topic?: HelpCategoryId
  onTopicChange: (topic: HelpCategoryId | undefined) => void
}

export function HelpHero({
  articleCount,
  categories,
  counts,
  query,
  onQueryChange,
  onQuerySubmit,
  onQueryBlur,
  searchInputRef,
  topic,
  onTopicChange,
}: HelpHeroProps) {
  const isMobile = useIsMobile()

  return (
    <section
      aria-labelledby='help-center-title'
      className='flex w-full flex-col items-start gap-3 py-1 md:items-center md:gap-4 md:pt-10 md:pb-2'
    >
      <p className='text-muted-foreground text-xs font-semibold tracking-widest uppercase'>
        Help Center
      </p>
      <h1
        id='help-center-title'
        className='text-2xl font-bold tracking-tight md:text-4xl'
      >
        How can we help?
      </h1>
      <p className='text-muted-foreground text-sm md:text-base'>
        {articleCount === undefined
          ? 'Search articles, or filter by topic.'
          : `Search ${articleCount} articles, or filter by topic.`}
      </p>
      <HelpSearchField
        size='lg'
        className='md:max-w-160'
        placeholder={
          isMobile ? 'Search articles…' : 'Search articles, e.g. “invoice”'
        }
        value={query}
        onValueChange={onQueryChange}
        onSubmit={onQuerySubmit}
        onBlur={onQueryBlur}
        inputRef={searchInputRef}
      />
      <TopicChips
        categories={categories}
        counts={counts}
        total={articleCount ?? 0}
        value={topic}
        onValueChange={onTopicChange}
      />
    </section>
  )
}
