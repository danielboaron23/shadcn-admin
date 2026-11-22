import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { HelpCenter } from '@/features/help-center'
import { helpCategories } from '@/features/help-center/data/articles'

const helpCenterSearchSchema = z.object({
  // The router reads `?q=123` as a number and `?q=true` as a boolean.
  // Keep them as the text the person typed instead of dropping them.
  q: z
    .union([z.string(), z.number(), z.boolean()])
    .transform(String)
    .optional()
    .catch(''),
  category: z
    .enum(helpCategories.map((category) => category.id))
    .optional()
    .catch(undefined),
  article: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/help-center/')({
  validateSearch: helpCenterSearchSchema,
  component: HelpCenter,
})
