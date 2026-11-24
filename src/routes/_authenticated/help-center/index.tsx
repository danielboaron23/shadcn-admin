import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { HelpCenter } from '@/features/help-center'
import { helpContentQueryOptions } from '@/features/help-center/data/queries'

const helpCenterSearchSchema = z.object({
  // Search text. Filters article titles and bodies as you type.
  q: z.string().optional().catch(''),
  // Topic id. Missing or unknown means "All".
  topic: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/help-center/')({
  validateSearch: helpCenterSearchSchema,
  // Starts loading the content early (on link hover too) without blocking.
  loader: ({ context }) => {
    void context.queryClient.prefetchQuery(helpContentQueryOptions)
  },
  component: HelpCenter,
})
