import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { HelpCenter } from '@/features/help-center'
import { helpCategories } from '@/features/help-center/data/articles'

const helpCenterSearchSchema = z.object({
  q: z.string().optional().catch(''),
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
