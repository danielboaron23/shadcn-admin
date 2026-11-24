import { format, parseISO } from 'date-fns'
import {
  type HelpArticle,
  type HelpCategory,
  type HelpCategoryId,
} from './articles'

/** Topics in their own order, titles A to Z inside each topic. */
export function sortByTopic(
  articles: HelpArticle[],
  categories: HelpCategory[]
): HelpArticle[] {
  const topicOrder = new Map(categories.map((c, index) => [c.id, index]))

  return [...articles].sort(
    (a, b) =>
      (topicOrder.get(a.categoryId) ?? 0) -
        (topicOrder.get(b.categoryId) ?? 0) || a.title.localeCompare(b.title)
  )
}

/**
 * Keeps articles in the topic (if one is set) whose title, summary or body
 * contains every word of the query. Not case sensitive.
 */
export function filterArticles(
  articles: HelpArticle[],
  { query, topic }: { query: string; topic?: HelpCategoryId }
): HelpArticle[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)

  return articles.filter((article) => {
    if (topic && article.categoryId !== topic) return false
    if (words.length === 0) return true

    const text =
      `${article.title} ${article.summary} ${article.body}`.toLowerCase()
    return words.every((word) => text.includes(word))
  })
}

export function countByTopic(
  articles: HelpArticle[]
): Partial<Record<HelpCategoryId, number>> {
  const counts: Partial<Record<HelpCategoryId, number>> = {}
  for (const article of articles) {
    counts[article.categoryId] = (counts[article.categoryId] ?? 0) + 1
  }
  return counts
}

/** Other articles in the same topic first, then popular ones from elsewhere. */
export function getRelatedArticles(
  article: HelpArticle,
  articles: HelpArticle[],
  limit = 2
): HelpArticle[] {
  const others = articles.filter((a) => a.slug !== article.slug)
  const sameTopic = others.filter((a) => a.categoryId === article.categoryId)
  const popularElsewhere = others.filter(
    (a) => a.categoryId !== article.categoryId && a.popular
  )

  return [...sameTopic, ...popularElsewhere].slice(0, limit)
}

/** "2026-11-10" becomes "Nov 10, 2026". */
export function formatUpdatedAt(isoDate: string): string {
  return format(parseISO(isoDate), 'MMM d, yyyy')
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}

/** "1 article", "12 articles". */
export function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`
}
