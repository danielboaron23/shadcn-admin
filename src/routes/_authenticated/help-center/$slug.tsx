import { createFileRoute } from '@tanstack/react-router'
import { HelpArticle } from '@/features/help-center/article'

export const Route = createFileRoute('/_authenticated/help-center/$slug')({
  component: HelpArticle,
})
