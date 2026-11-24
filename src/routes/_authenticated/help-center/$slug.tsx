import { createFileRoute } from '@tanstack/react-router'
import { HelpArticle } from '@/features/help-center/article'
import { helpContentQueryOptions } from '@/features/help-center/data/queries'

export const Route = createFileRoute('/_authenticated/help-center/$slug')({
  // Starts loading the content early (on link hover too) without blocking.
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(helpContentQueryOptions)
  },
  component: HelpArticle,
})
