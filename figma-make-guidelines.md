# Figma Make UI Generation Guidelines

Strict rules for AI-generated UI using the `@yourcompany/design-system` package.

## General Rules

- Always use flexbox or grid for layouts
- Never use absolute positioning except for overlays, dropdowns, or popovers
- Always make layouts responsive using mobile-first approach
- Never hardcode colors using hex, rgb, or oklch values
- Always support dark mode by default
- Always use Tailwind utility classes for spacing
- Never create inline styles with `style={{}}` for spacing or colors
- Always use semantic HTML elements where appropriate
- Never use custom z-index values outside overlay components
- Always ensure minimum touch target size of 44x44px for interactive elements

## Design System Usage

- Always import components from `@yourcompany/design-system` or `@yourcompany/design-system/extended`
- Never recreate existing components (Button, Input, Dialog, etc.)
- Never use raw HTML tags: `<button>`, `<input>`, `<select>`, `<textarea>`, `<label>`
- Always use the `cn()` utility from the design system for conditional classes
- Never override component internal styles or structure
- Always use exact component names with proper capitalization (Button not button)
- Never modify component variant props via className overrides
- Always import CSS variables only from theme.css
- Never bundle or duplicate component code

### Package Imports

```typescript
// Core components
import { Button, Input, Label, Form, Dialog, Card } from '@yourcompany/design-system'

// Extended components
import { DataTablePagination, ThemeSwitch } from '@yourcompany/design-system/extended'

// Utilities
import { cn } from '@yourcompany/design-system'
```

## CSS Variables (Colors & Tokens)

- Always use CSS variables for all colors: `text-primary`, `bg-background`, `border-border`
- Never hardcode color values
- Available color tokens: `primary`, `secondary`, `destructive`, `accent`, `muted`, `background`, `foreground`, `border`, `input`, `ring`
- Available semantic tokens: `card`, `popover`, `sidebar-*`, `chart-1` through `chart-5`
- Spacing token: `--radius` for border radius (0.625rem)
- Always use Tailwind color classes that map to CSS variables (e.g., `bg-primary`, `text-foreground`)

## Layout Patterns

### Admin List Page

```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Page Title</CardTitle>
      <Button>Primary Action</Button>
    </div>
  </CardHeader>
  <CardContent>
    <DataTableToolbar table={table} />
    <Table>
      {/* table content */}
    </Table>
    <DataTablePagination table={table} />
  </CardContent>
</Card>
```

**Required structure:**
- Always wrap in Card component
- Always place title + primary action in CardHeader
- Always use DataTableToolbar for search/filters
- Always use DataTablePagination at bottom
- Never create custom pagination

### Settings Page

```tsx
<div className="flex gap-6">
  <Tabs orientation="vertical" className="w-64">
    <TabsList>
      <TabsTrigger>Section 1</TabsTrigger>
      <TabsTrigger>Section 2</TabsTrigger>
    </TabsList>
  </Tabs>
  <div className="flex-1 space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Setting Title</CardTitle>
        <CardDescription>Description text</CardDescription>
      </CardHeader>
      <CardContent>
        <Form>{/* form fields */}</Form>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  </div>
</div>
```

**Required structure:**
- Always use two-column layout (Tabs left, content right)
- Always wrap each section in a Card
- Always use CardDescription for context
- Always place action buttons in CardFooter
- Never nest forms inside Sidebar

### Create/Edit Flow

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Create New</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Item</SheetTitle>
    </SheetHeader>
    <Form {...form}>
      <FormField name="field">
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </Form>
    <SheetFooter>
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

**Required structure:**
- Always use Sheet for forms with 3+ fields, Dialog for simple forms
- Always wrap form fields in Form component from design system
- Always use FormField + FormItem + FormLabel + FormControl + FormMessage pattern
- Always show FormMessage for validation errors
- Always place Cancel + Submit buttons in footer

## Component Rules

### Button

**When to use:**
- Primary actions (save, submit, create)
- Secondary actions (cancel, back)
- Icon-only actions with `size="icon"`

**Available variants:**
- `default` - Primary actions (default if not specified)
- `destructive` - Delete, remove, or destructive actions
- `outline` - Secondary actions
- `secondary` - Alternative secondary styling
- `ghost` - Tertiary actions, icon buttons
- `link` - Text-style links that perform actions

**Available sizes:**
- `default` - Standard button (h-9, default if not specified)
- `sm` - Compact spaces (h-8)
- `lg` - Prominent actions (h-10)
- `icon` - Icon-only buttons (size-9)

**Never:**
- Never use Button for navigation links (use Link with `asChild` if needed)
- Never mix multiple variants on same button
- Never create custom button colors via className
- Never override size via className (use size prop)
- Never manually size icons inside buttons (auto-sized to 16px)

**Common mistakes:**
- Using `<button>` tag instead of Button component
- Adding `onClick` to Link elements (use Button with `asChild`)
- Overriding variant styles with custom classes

### Input

**When to use:**
- Text input fields
- Email, password, number inputs
- Search fields

**Always:**
- Always wrap in FormControl when inside Form
- Always pair with Label component
- Always use `type` prop for semantic inputs
- Always show FormMessage for errors

**Never:**
- Never use `<input>` tag directly
- Never use Input without Label
- Never create custom input styling

### Label

**When to use:**
- All form inputs
- Checkbox and radio labels
- Form field labels

**Always:**
- Always associate with input via htmlFor
- Always use with FormItem in forms

**Never:**
- Never use `<label>` tag directly
- Never omit Label for form inputs (except hidden fields)

### Textarea

**When to use:**
- Multi-line text input
- Long-form content (descriptions, comments)

**Always:**
- Always wrap in FormControl when inside Form
- Always pair with Label

**Never:**
- Never use `<textarea>` tag directly

### Form (react-hook-form integration)

**When to use:**
- All forms with 1+ field
- Forms requiring validation

**Required pattern:**
```tsx
const form = useForm()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Optional help text</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

**Always:**
- Always use Form component wrapper
- Always use FormField for each field
- Always use FormItem + FormLabel + FormControl + FormMessage structure
- Always spread `{...field}` on form controls
- Always use zod for validation schema
- Always display FormMessage for errors
- Always use `form.handleSubmit()` for submission

**Never:**
- Never use raw input elements in forms
- Never skip FormControl wrapper
- Never handle validation manually
- Never omit FormMessage
- Never use Input directly without FormControl in forms

### Checkbox

**When to use:**
- Boolean toggles
- Multi-select options
- Terms acceptance

**Always:**
- Always wrap in FormControl when inside Form
- Always pair with Label
- Always use controlled via react-hook-form

**Never:**
- Never use without Label
- Never use for single on/off state (use Switch instead)

### RadioGroup

**When to use:**
- Single selection from 2-5 options
- Mutually exclusive choices

**Always:**
- Always wrap RadioGroupItem in FormControl
- Always provide Label for each RadioGroupItem
- Always use with FormField in forms

**Never:**
- Never use for many options (use Select instead)

### Switch

**When to use:**
- Single on/off toggle
- Settings toggles
- Feature enables/disables

**Always:**
- Always pair with Label
- Always wrap in FormControl when inside Form

**Never:**
- Never use for multiple options (use RadioGroup)

### Select

**When to use:**
- Dropdown selection from 5+ options
- Single choice from many options

**Always:**
- Always use SelectTrigger + SelectContent + SelectItem structure
- Always wrap in FormControl when inside Form
- Always provide SelectValue placeholder

**Never:**
- Never use `<select>` tag directly
- Never create custom dropdown menus for selection

**Common structure:**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dialog vs Sheet

**Dialog - when to use:**
- Confirmations
- Alerts
- Small forms (1-3 fields)
- Quick actions
- Centered modal style
- Max width constrained (max-w-lg)

**Sheet - when to use:**
- Complex forms (3+ fields)
- Detail views
- Filters panel
- Side panel style
- Full height

**Always:**
- Always use AlertDialog for destructive confirmations
- Always use Sheet for forms with 5+ fields
- Always include header with title
- Always include footer with actions

**Never:**
- Never use Dialog for complex forms
- Never use Sheet for simple confirmations
- Never create custom modal components

### Popover

**When to use:**
- Contextual content
- Date pickers (with Calendar)
- Dropdown content that's not menu actions

**Never:**
- Never use for navigation menus (use DropdownMenu)
- Never use for form selection (use Select)

### DropdownMenu

**When to use:**
- Contextual actions
- User menus
- Table row actions
- Settings menus

**Always:**
- Always use DropdownMenuItem for actions
- Always use DropdownMenuSeparator between logical groups
- Always use DropdownMenuLabel for section headers

**Never:**
- Never use for navigation (use Tabs or Sidebar)
- Never nest more than one level (use DropdownMenuSub if needed)
- Never create custom dropdown components

**Common structure:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tooltip

**When to use:**
- Icon button labels
- Truncated text expansion
- Additional context on hover

**Always:**
- Always wrap TooltipTrigger and TooltipContent in Tooltip
- Always wrap multiple tooltips in TooltipProvider
- Always keep tooltip text concise (1-2 lines)

**Never:**
- Never use for critical information
- Never use for interactive content

### Card

**When to use:**
- Content grouping
- Dashboard widgets
- List containers
- Settings sections

**Always:**
- Always use CardHeader for title area
- Always use CardContent for main content
- Always use CardFooter for actions
- Always use CardTitle for heading
- Always use CardDescription for subtitle/context

**Never:**
- Never skip CardHeader if there's a title
- Never put actions in CardContent (use CardFooter)

### Table vs DataTable Suite

**Table - when to use:**
- Simple read-only data (< 10 rows)
- Static data display
- No sorting, filtering, or pagination needed

**DataTable Suite - when to use:**
- Admin list pages
- Sortable columns
- Filterable data
- Paginated data
- Bulk actions
- Row actions

**DataTable components available:**
- `DataTablePagination` - Required for pagination controls
- `DataTableColumnHeader` - Required for sortable columns
- `DataTableFacetedFilter` - Multi-select filters
- `DataTableViewOptions` - Column visibility toggle
- `DataTableToolbar` - Search and filter bar
- `DataTableBulkActions` - Actions for selected rows

**Always:**
- Always use DataTablePagination with DataTable
- Always use DataTableColumnHeader for sortable columns
- Always use DataTableToolbar for search/filters
- Always use @tanstack/react-table for table state

**Never:**
- Never build custom pagination when DataTablePagination exists
- Never create custom column headers for sorting
- Never use Table component for complex data tables

### Tabs

**When to use:**
- Section navigation within a page
- Content switching
- Settings categories

**Always:**
- Always use TabsList wrapper for triggers
- Always use TabsTrigger for each tab
- Always use TabsContent for each panel
- Always provide value prop for controlled state

**Never:**
- Never use for app-level navigation (use Sidebar)
- Never nest tabs more than one level deep

### Separator

**When to use:**
- Visual dividers between sections
- Menu item groups
- Content sections

**Always:**
- Always specify orientation (horizontal/vertical) when needed

**Never:**
- Never use custom divider elements
- Never use border utilities when Separator is appropriate

### ScrollArea

**When to use:**
- Constrained scrollable content
- Sidebar content
- Dropdown menus with many items

**Always:**
- Always specify height constraint
- Always use ScrollBar component for custom scrollbars

**Never:**
- Never use for full-page scrolling

### Sidebar

**When to use:**
- App-level navigation only
- Primary navigation menu

**Required structure:**
```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>{/* logo/title */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Section</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">Link</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>{/* user menu */}</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <main>{/* page content */}</main>
  </SidebarInset>
</SidebarProvider>
```

**Always:**
- Always wrap in SidebarProvider
- Always use SidebarMenu + SidebarMenuItem structure
- Always use SidebarMenuButton for navigation items
- Always place page content in SidebarInset

**Never:**
- Never put forms inside Sidebar
- Never put tables inside Sidebar
- Never use for in-page navigation (use Tabs)

**Available components:**
- `Sidebar`, `SidebarProvider`, `SidebarInset`
- `SidebarHeader`, `SidebarContent`, `SidebarFooter`
- `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarGroupAction`
- `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuBadge`
- `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`
- `SidebarSeparator`, `SidebarTrigger`, `SidebarRail`
- `SidebarInput`, `SidebarMenuSkeleton`
- `useSidebar` hook

### Alert

**When to use:**
- Important inline messages
- Status notifications within content
- Informational banners

**Always:**
- Always use AlertTitle for heading
- Always use AlertDescription for details

**Never:**
- Never use for temporary notifications (use Toast)
- Never use for critical confirmations (use AlertDialog)

### AlertDialog

**When to use:**
- Destructive confirmations (delete, remove)
- Critical decisions
- Irreversible actions

**Always:**
- Always use AlertDialogTitle and AlertDialogDescription
- Always provide AlertDialogAction and AlertDialogCancel
- Always use for destructive actions

**Never:**
- Never use for non-critical confirmations (use Dialog)
- Never use for forms (use Sheet or Dialog)

### Badge

**When to use:**
- Status indicators
- Count labels
- Tags
- Category labels

**Always:**
- Always keep text short (1-2 words)

**Never:**
- Never use for interactive elements (use Button)

### Avatar

**When to use:**
- User profile images
- User lists

**Always:**
- Always use AvatarImage + AvatarFallback
- Always provide fallback text (initials)

### Skeleton

**When to use:**
- Loading states
- Content placeholders

**Always:**
- Always match shape/size of actual content

**Never:**
- Never show skeleton for < 500ms loads

### Calendar

**When to use:**
- Date selection
- Date range picking

**Always:**
- Always use inside Popover for date pickers
- Always use with react-day-picker

**Never:**
- Never create custom date pickers

### Collapsible

**When to use:**
- Expandable sections
- Accordion-style content

**Always:**
- Always use CollapsibleTrigger + CollapsibleContent

### Command

**When to use:**
- Command palette (Cmd+K)
- Searchable action menus

**Always:**
- Always use CommandInput for search
- Always use CommandList wrapper
- Always provide CommandEmpty state

**Never:**
- Never use for simple dropdowns (use Select or DropdownMenu)

### InputOTP

**When to use:**
- One-time password entry
- Verification codes

**Always:**
- Always use InputOTPGroup + InputOTPSlot
- Always specify maxLength

**Never:**
- Never use regular Input for OTP codes

### Toast / Sonner

**When to use:**
- Success confirmations ("Saved successfully")
- Error messages ("Failed to save")
- Info notifications
- Temporary feedback

**Always:**
- Always use Toaster component in app root
- Always call `toast()` from sonner package for notifications
- Always keep messages brief (1 line preferred)

**Never:**
- Never create custom toast components
- Never use for critical errors (use AlertDialog)
- Never show toast for validation errors (use FormMessage)

```tsx
// In app root
import { Toaster } from '@yourcompany/design-system'
<Toaster />

// In components
import { toast } from 'sonner'
toast.success('Item created')
toast.error('Failed to delete')
```

### ThemeSwitch

**When to use:**
- Theme toggle in settings
- Header theme switcher

**Always:**
- Always pass `theme` and `setTheme` props explicitly
- Always use with theme provider context

**Props required:**
- `theme: 'light' | 'dark' | 'system'`
- `setTheme: (theme: 'light' | 'dark' | 'system') => void`

**Never:**
- Never use without theme provider
- Never use Toaster component without matching theme

## Hard Rules (Non-Negotiable)

### NEVER

- Never use `<button>` tag (use Button component)
- Never use `<input>` tag (use Input component)
- Never use `<select>` tag (use Select component)
- Never use `<textarea>` tag (use Textarea component)
- Never use `<label>` tag (use Label component)
- Never hardcode colors with hex, rgb, or oklch values
- Never use `style={{}}` for theme colors or spacing
- Never create custom dropdown/menu components
- Never create custom dialog/modal components
- Never create custom toast/notification components
- Never bypass Form component in forms
- Never use `className` to override component size variants
- Never create custom pagination controls
- Never use `!important` in styles
- Never use custom z-index outside overlay components
- Never recreate existing design system components
- Never override component internal structure
- Never skip FormMessage in form fields
- Never use Input without Label (except hidden fields)
- Never put forms or tables inside Sidebar
- Never use Dialog for complex forms (use Sheet)
- Never use Sheet for simple confirmations (use Dialog/AlertDialog)
- Never use Toast for critical errors (use AlertDialog)
- Never use Button for navigation (use proper Link component with asChild if needed)

### ALWAYS

- Always import from `@yourcompany/design-system` or `@yourcompany/design-system/extended`
- Always use CSS variables for colors (via Tailwind classes)
- Always use `cn()` utility for conditional/merged classes
- Always use Button `variant` prop for styling (never className overrides)
- Always use Form + FormField pattern for all forms
- Always use DataTable suite for admin tables with sorting/filtering/pagination
- Always support dark mode (automatically handled by CSS variables)
- Always use Tailwind utility classes for spacing
- Always use Label with all form inputs
- Always validate forms with zod + react-hook-form
- Always use toast() for success/error feedback
- Always use exact component names from package exports (PascalCase)
- Always wrap Sidebar in SidebarProvider
- Always use FormMessage for validation errors
- Always use AlertDialog for destructive confirmations
- Always use DataTablePagination with complex tables
- Always specify Button variant explicitly for non-default styling
- Always use Sheet for forms with 5+ fields
- Always use CardHeader, CardContent, CardFooter structure
- Always pair interactive elements with proper labels
- Always use semantic HTML where possible

### PREFER

- Prefer Sheet over Dialog for complex forms (3+ fields)
- Prefer Card for content grouping
- Prefer DropdownMenu over custom menus
- Prefer Tabs over custom in-page navigation
- Prefer Skeleton for loading states
- Prefer Badge for status indicators
- Prefer Separator over custom dividers or borders
- Prefer ScrollArea for constrained scrollable regions
- Prefer AlertDialog for destructive actions
- Prefer FormDescription for field help text
- Prefer ghost variant Button for icon-only actions
- Prefer outline variant Button for secondary actions
- Prefer destructive variant Button for delete/remove actions
- Prefer DataTable suite over basic Table for admin interfaces
- Prefer Popover + Calendar over custom date pickers

## File Organization

- Always co-locate related components
- Always use descriptive file names (kebab-case)
- Never create circular dependencies
- Always import icons from lucide-react

## Accessibility

- Always provide aria-label for icon-only buttons
- Always associate labels with inputs
- Always provide alt text for images
- Always ensure keyboard navigation works
- Always maintain focus management in modals
- Always use semantic HTML elements

## Performance

- Always use controlled components for forms
- Never re-render entire tables on filter changes (use @tanstack/react-table)
- Always debounce search inputs
- Never perform heavy computations in render

---

**Package Name**: `@yourcompany/design-system`

**Available Exports**:
- Default: `@yourcompany/design-system` (all core components)
- Core: `@yourcompany/design-system/core` (core components only)
- Extended: `@yourcompany/design-system/extended` (DataTable suite, ThemeSwitch)
- Styles: `@yourcompany/design-system/styles` (CSS imports)


