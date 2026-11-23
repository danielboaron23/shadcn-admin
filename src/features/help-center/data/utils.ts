import { format, parseISO } from 'date-fns'
import {
  helpArticles,
  helpCategories,
  type HelpArticle,
  type HelpCategoryId,
} from './articles'

export function getCategoryTitle(id: HelpCategoryId) {
  return helpCategories.find((category) => category.id === id)?.title ?? ''
}

export function getArticle(slug: string) {
  return helpArticles.find((article) => article.slug === slug)
}

/** Articles that match the search term (title or summary) and the category. */
export function findArticles(term: string, category?: HelpCategoryId) {
  const needle = term.trim().toLowerCase()
  return helpArticles.filter(
    (article) =>
      (!category || article.categoryId === category) &&
      (!needle ||
        article.title.toLowerCase().includes(needle) ||
        article.summary.toLowerCase().includes(needle))
  )
}

/** Other articles from the same category. */
export function getRelatedArticles(article: HelpArticle, limit = 2) {
  return helpArticles
    .filter(
      (other) =>
        other.categoryId === article.categoryId && other.slug !== article.slug
    )
    .slice(0, limit)
}

export function formatCount(count: number, noun: 'article' | 'result') {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`
}

export function formatUpdatedAt(isoDate: string) {
  return format(parseISO(isoDate), 'MMM d, yyyy')
}
