import { queryOptions } from '@tanstack/react-query'

/**
 * Help Center content, loaded on demand.
 *
 * The content is a static file today, so this resolves quickly. Swap the
 * import for an API call later and the loading state keeps working.
 */
export const helpContentQueryOptions = queryOptions({
  queryKey: ['help-center', 'content'],
  queryFn: async () => {
    const { helpArticles, helpCategories } = await import('./articles')
    return { articles: helpArticles, categories: helpCategories }
  },
  staleTime: Infinity,
})
