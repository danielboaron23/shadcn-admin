import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { HelpCenter } from '@/features/help-center'
import { helpCategories } from '@/features/help-center/data/articles'

const helpCenterSearchSchema = z.object({
  // Coerced so a hand-typed ?q=123 is kept as text instead of being dropped.
  q: z.coerce.string().optional().catch(''),
  // An unknown category falls back to all articles.
  category: z
    .enum(helpCategories.map((category) => category.id))
    .optional()
    .catch(undefined),
})

export const Route = createFileRoute('/_authenticated/help-center/')({
  validateSearch: helpCenterSearchSchema,
  component: HelpCenter,
})
