import { useIsMobile } from '@/hooks/use-mobile'
import { helpArticles, type HelpCategoryId } from '../data/articles'
import { CategoryChips } from './category-chips'
import { HelpSearchField } from './help-search-field'

type HelpHeroProps = {
  query: string
  onQueryChange: (query: string) => void
  onQuerySubmit?: () => void
  category?: HelpCategoryId
  onCategoryChange: (category?: HelpCategoryId) => void
  searchRef?: React.RefObject<HTMLInputElement | null>
}

export function HelpHero({
  query,
  onQueryChange,
  onQuerySubmit,
  category,
  onCategoryChange,
  searchRef,
}: HelpHeroProps) {
  const isMobile = useIsMobile()

  return (
    <section className='flex flex-col gap-3 py-1 sm:items-center sm:gap-4 sm:pt-10 sm:pb-2 sm:text-center'>
      <p className='text-muted-foreground text-xs font-semibold tracking-widest uppercase'>
        Help Center
      </p>
      <h1 className='text-2xl font-bold tracking-tight sm:text-4xl'>
        How can we help?
      </h1>
      <p className='text-muted-foreground text-sm sm:text-base'>
        Search {helpArticles.length} articles, or filter by topic.
      </p>
      <HelpSearchField
        size='lg'
        className='sm:max-w-2xl'
        inputRef={searchRef}
        value={query}
        onValueChange={onQueryChange}
        onSubmit={onQuerySubmit}
        placeholder={
          isMobile ? 'Search articles…' : 'Search articles, e.g. “invoice”'
        }
      />
      <CategoryChips selected={category} onSelect={onCategoryChange} />
    </section>
  )
}
