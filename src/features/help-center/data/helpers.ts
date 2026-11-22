import {
  type HelpArticle,
  type HelpCategory,
  type HelpCategoryId,
  helpArticles,
  helpCategories,
} from './articles'

const updatedAtFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/** `2026-10-28` -> `Oct 28, 2026`. The ISO date is read as UTC so the day never shifts. */
export function formatUpdatedAt(isoDate: string) {
  return updatedAtFormat.format(new Date(isoDate))
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`
}

export function getCategory(id: HelpCategoryId): HelpCategory | undefined {
  return helpCategories.find((category) => category.id === id)
}

export function getArticle(slug: string | undefined): HelpArticle | undefined {
  if (!slug) return undefined
  return helpArticles.find((article) => article.slug === slug)
}

/** Other articles in the same category, in data order. */
export function getRelatedArticles(article: HelpArticle): HelpArticle[] {
  return helpArticles.filter(
    (other) =>
      other.categoryId === article.categoryId && other.slug !== article.slug
  )
}

/** Case-insensitive match on title and summary, optionally limited to one category. */
export function filterArticles(
  query: string,
  categoryId?: HelpCategoryId
): HelpArticle[] {
  const needle = query.trim().toLowerCase()
  return helpArticles.filter((article) => {
    if (categoryId && article.categoryId !== categoryId) return false
    if (!needle) return true
    return (
      article.title.toLowerCase().includes(needle) ||
      article.summary.toLowerCase().includes(needle)
    )
  })
}
