import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/features/dashboard'
import { PRESET_KEYS } from '@/features/dashboard/lib/reports-presets'

// Search schema for the Reports tab. Every field is `.optional().catch(...)`
// so missing or malformed params never crash navigation.
const dashboardSearchSchema = z.object({
  preset: z
    .enum(PRESET_KEYS)
    .optional()
    .catch(undefined),
  from: z.string().optional().catch(undefined),
  to: z.string().optional().catch(undefined),
  page: z.number().optional().catch(undefined),
  pageSize: z.number().optional().catch(undefined),
  channel: z
    .array(z.enum(['web', 'mobile', 'partner']))
    .optional()
    .catch([]),
})

export const Route = createFileRoute('/_authenticated/')({
  validateSearch: dashboardSearchSchema,
  component: Dashboard,
})
