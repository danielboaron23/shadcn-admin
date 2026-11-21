/**
 * Mock content for the Help Center (demo feature: KAN "Help Center, in depth").
 *
 * Static, typed and deterministic so every demo take shows the same content.
 * Replace with a real CMS/API later; keep the types stable.
 */

export type HelpCategoryId =
  | 'getting-started'
  | 'account-billing'
  | 'tasks-workflows'
  | 'team-permissions'

export type HelpCategory = {
  id: HelpCategoryId
  title: string
  description: string
}

export type HelpArticle = {
  /** URL-safe id, unique across all categories. */
  slug: string
  categoryId: HelpCategoryId
  title: string
  /** One line, shown in lists and search results. */
  summary: string
  /** Short body. Paragraphs are separated by a blank line. */
  body: string
  /** ISO date (YYYY-MM-DD). */
  updatedAt: string
  readingMinutes: number
  popular?: boolean
}

export const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Set up your workspace and learn the basics.',
  },
  {
    id: 'account-billing',
    title: 'Account & billing',
    description: 'Manage your profile, plan and invoices.',
  },
  {
    id: 'tasks-workflows',
    title: 'Tasks & workflows',
    description: 'Create, filter and track work across your team.',
  },
  {
    id: 'team-permissions',
    title: 'Team & permissions',
    description: 'Invite people and control what they can see.',
  },
]

export const helpArticles: HelpArticle[] = [
  // Getting started
  {
    slug: 'create-your-workspace',
    categoryId: 'getting-started',
    title: 'Create your workspace',
    summary:
      'Name your workspace, pick a theme and invite your first teammate.',
    body: 'After you sign in, open Settings and give your workspace a name. This name appears in the sidebar and in every email we send to your team.\n\nPick a light or dark theme under Appearance. You can change it any time, and each teammate can choose their own.',
    updatedAt: '2026-10-28',
    readingMinutes: 2,
    popular: true,
  },
  {
    slug: 'tour-the-dashboard',
    categoryId: 'getting-started',
    title: 'Tour the dashboard',
    summary:
      'What each card on the Overview tab means and where the numbers come from.',
    body: 'The Overview tab shows four cards: revenue, subscriptions, sales and active users. Each card compares this period with the previous one.\n\nHover the info icon on a card to see how the number is calculated.',
    updatedAt: '2026-11-04',
    readingMinutes: 3,
  },
  {
    slug: 'keyboard-shortcuts',
    categoryId: 'getting-started',
    title: 'Keyboard shortcuts',
    summary: 'Move around faster with the command menu and a few shortcuts.',
    body: 'Press Ctrl+K (or Cmd+K on Mac) to open the command menu. Type a page name to jump to it.\n\nUse Tab and Shift+Tab to move between controls. Every action in the app can be reached from the keyboard.',
    updatedAt: '2026-09-15',
    readingMinutes: 1,
  },
  // Account & billing
  {
    slug: 'change-your-plan',
    categoryId: 'account-billing',
    title: 'Change your plan',
    summary:
      'Upgrade or downgrade at any time. Changes apply on your next invoice.',
    body: 'Open Settings, then Account, and choose Change plan. Upgrades start right away and are prorated.\n\nDowngrades take effect at the end of the current billing period, so you keep your current features until then.',
    updatedAt: '2026-11-10',
    readingMinutes: 2,
    popular: true,
  },
  {
    slug: 'download-invoices',
    categoryId: 'account-billing',
    title: 'Download past invoices',
    summary: 'Get a PDF of any invoice for your records or your finance team.',
    body: 'Invoices are listed under Settings, Account, Billing history. Select an invoice to download it as a PDF.\n\nNeed the company name or VAT number changed on an invoice? Update your billing details first, then download it again.',
    updatedAt: '2026-10-02',
    readingMinutes: 1,
  },
  {
    slug: 'update-profile',
    categoryId: 'account-billing',
    title: 'Update your profile and email',
    summary: 'Change your name, avatar and the email you sign in with.',
    body: 'Go to Settings, then Profile. Changes to your name and avatar are visible to your team right away.\n\nIf you change your sign-in email, we send a confirmation link to the new address. The change applies once you open it.',
    updatedAt: '2026-08-21',
    readingMinutes: 2,
  },
  // Tasks & workflows
  {
    slug: 'create-and-assign-tasks',
    categoryId: 'tasks-workflows',
    title: 'Create and assign tasks',
    summary: 'Add a task, set its priority and hand it to a teammate.',
    body: 'On the Tasks page, choose Create. Give the task a title, a label and a priority, then pick an assignee.\n\nThe assignee sees the task in their list right away. You can change any field later from the row menu.',
    updatedAt: '2026-11-12',
    readingMinutes: 2,
    popular: true,
  },
  {
    slug: 'filter-and-search-tasks',
    categoryId: 'tasks-workflows',
    title: 'Filter and search tasks',
    summary:
      'Find tasks by title, ID, status or priority, and share the filtered view.',
    body: 'Type in the filter box to search by title or task ID. Use the Status and Priority buttons to narrow the list.\n\nFilters are saved in the page URL, so you can copy the link and send a teammate exactly the view you see.',
    updatedAt: '2026-11-01',
    readingMinutes: 2,
  },
  {
    slug: 'import-tasks-csv',
    categoryId: 'tasks-workflows',
    title: 'Import tasks from a CSV file',
    summary: 'Bring existing work in from a spreadsheet in one step.',
    body: 'Choose Import on the Tasks page and select a CSV file. The first row must contain column names such as title, status and priority.\n\nRows that cannot be read are skipped, and we tell you which ones so you can fix them.',
    updatedAt: '2026-09-30',
    readingMinutes: 3,
  },
  // Team & permissions
  {
    slug: 'invite-teammates',
    categoryId: 'team-permissions',
    title: 'Invite teammates',
    summary: 'Send an invite by email and choose a role before they join.',
    body: 'On the Users page, choose Invite user. Enter their email, pick a role and add an optional message.\n\nInvited people appear with the Invited status until they accept. You can resend or cancel an invite from the row menu.',
    updatedAt: '2026-11-08',
    readingMinutes: 2,
    popular: true,
  },
  {
    slug: 'roles-explained',
    categoryId: 'team-permissions',
    title: 'Roles explained',
    summary: 'What superadmins, admins, managers and cashiers can each do.',
    body: 'Superadmins can do everything, including billing. Admins manage users and settings. Managers manage tasks for their team. Cashiers can view and record sales.\n\nGive people the smallest role that lets them do their job. You can change a role at any time.',
    updatedAt: '2026-10-19',
    readingMinutes: 3,
  },
  {
    slug: 'suspend-or-remove-user',
    categoryId: 'team-permissions',
    title: 'Suspend or remove a user',
    summary: 'Block access right away, or remove someone for good.',
    body: 'Suspending a user blocks sign-in but keeps their work and history. Use it when someone is on leave or you are not sure yet.\n\nRemoving a user is permanent. Their tasks stay in the workspace and become unassigned.',
    updatedAt: '2026-07-11',
    readingMinutes: 2,
  },
]
