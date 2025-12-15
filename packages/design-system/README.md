# @yourcompany/design-system

A production-grade Design System package extracted from shadcn-admin, built for Figma Make compatibility and private npm registry distribution.

## 📦 Installation

```bash
# From workspace (development)
pnpm add @yourcompany/design-system@workspace:*

# From private npm registry (production)
pnpm add @yourcompany/design-system
```

## 🚀 Quick Start

```typescript
// Import components
import { Button, Input, Card } from '@yourcompany/design-system'

// Import styles (required)
import '@yourcompany/design-system/styles'

// Use components
function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```

## 📚 Package Structure

### Core Components (30 components)
Essential shadcn/ui primitives with zero breaking changes from the original implementation.

**Form Controls:**
- `Button`, `Input`, `Label`, `Textarea`
- `Checkbox`, `RadioGroup`, `Switch`, `Select`, `InputOTP`

**Layout:**
- `Card`, `Separator`, `ScrollArea`, `Tabs`, `Table`, `Sidebar`

**Overlays:**
- `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `DropdownMenu`, `Tooltip`, `Command`

**Feedback:**
- `Alert`, `Badge`, `Skeleton`, `Avatar`, `Calendar`, `Collapsible`, `Toaster` (Sonner)

**Advanced:**
- `Form` (react-hook-form integration)

### Extended Components
Composite components built on top of Core components.

**Data Table Suite:**
- `ColumnHeader`, `FacetedFilter`, `Pagination`, `Toolbar`, `ViewOptions`

**Theme:**
- `ThemeSwitch` (requires theme provider prop injection)

### Utilities
- `cn` - Class name utility (clsx + tailwind-merge)
- `getPageNumbers` - Pagination helper
- `useIsMobile` - Mobile breakpoint hook

## 🎨 Styling

### CSS Variables
The design system uses CSS custom properties as the source of truth for theming:

```css
/* Light mode */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  /* ... more tokens */
}

/* Dark mode */
.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  /* ... more tokens */
}
```

### Importing Styles
Always import the styles in your app entry point:

```typescript
// src/main.tsx or src/index.tsx
import '@yourcompany/design-system/styles'
```

## 📖 Usage Examples

### Basic Form

```typescript
import { Button, Input, Label, Card } from '@yourcompany/design-system'

function LoginForm() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
    </Card>
  )
}
```

### Dialog with Form

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label
} from '@yourcompany/design-system'

function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Data Table with Extended Components

```typescript
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@yourcompany/design-system'
import { Pagination, Toolbar } from '@yourcompany/design-system/extended'

function UsersTable({ data, table }) {
  return (
    <div>
      <Toolbar table={table} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  )
}
```

### Theme Switch (Extended)

```typescript
import { ThemeSwitch } from '@yourcompany/design-system/extended'
import { useTheme } from './your-theme-provider'

function Header() {
  const { theme, setTheme } = useTheme()
  
  return (
    <header>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </header>
  )
}
```

## 🎯 Figma Make Integration

This design system is optimized for Figma Make:

### Named Exports
All components use named exports (required by Figma Make):

```typescript
// ✅ Correct
import { Button, Input } from '@yourcompany/design-system'

// ❌ Incorrect
import Button from '@yourcompany/design-system/button'
```

### TypeScript Interfaces
All component props are exported as TypeScript interfaces:

```typescript
import type { ButtonProps } from '@yourcompany/design-system'

const customButton: ButtonProps = {
  variant: 'outline',
  size: 'lg'
}
```

### Variant System
Components use `class-variance-authority` (CVA) which maps cleanly to Figma component properties:

```typescript
// Button variants map to Figma properties
<Button variant="default" size="lg">Click me</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="icon">...</Button>
```

### CSS Variables Mapping
OKLCH color tokens can be mapped to Figma variables:

```
--primary → Figma Color Variable: Primary
--radius → Figma Number Variable: Border Radius
```

## 🔧 Peer Dependencies

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "tailwindcss": "^4.0.0"
}
```

## 📦 Package Exports

```typescript
// Main export (all core components)
import { Button, Input, ... } from '@yourcompany/design-system'

// Core only
import { Button } from '@yourcompany/design-system/core'

// Extended only
import { Pagination, ThemeSwitch } from '@yourcompany/design-system/extended'

// Styles
import '@yourcompany/design-system/styles'
```

## 🏗️ Build Output

- **ESM**: `dist/index.js`, `dist/core.js`, `dist/extended.js`
- **CJS**: `dist/index.cjs`, `dist/core.cjs`, `dist/extended.cjs`
- **Types**: `dist/index.d.ts`, `dist/core.d.ts`, `dist/extended.d.ts`
- **Styles**: `dist/styles/index.css`, `dist/styles/theme.css`

## 🚢 Publishing to Private npm Registry

### 1. Configure Registry

Create `.npmrc` in your project root:

```ini
@yourcompany:registry=https://your-private-registry.com
//your-private-registry.com/:_authToken=${NPM_TOKEN}
```

### 2. Publish

```bash
cd packages/design-system
pnpm publish --access restricted
```

### 3. Install in Other Projects

```bash
pnpm add @yourcompany/design-system
```

## 🛠️ Development

### Build Package

```bash
pnpm build:ds
```

### Watch Mode

```bash
pnpm dev:ds
```

### Type Check

```bash
cd packages/design-system
pnpm typecheck
```

## 📝 Component Names

All component names are preserved exactly as in the original shadcn/ui implementation:

- ✅ `Button`, not `button`
- ✅ `DropdownMenu`, not `Dropdown`
- ✅ `AlertDialog`, not `Alert Dialog`

## 🎨 Customization

### Override CSS Variables

```css
/* your-app/styles/custom-theme.css */
:root {
  --primary: oklch(0.5 0.2 250);  /* Custom primary color */
  --radius: 0.5rem;                /* Custom border radius */
}
```

### Extend Components

```typescript
import { Button, type ButtonProps } from '@yourcompany/design-system'

interface CustomButtonProps extends ButtonProps {
  loading?: boolean
}

export function CustomButton({ loading, children, ...props }: CustomButtonProps) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? 'Loading...' : children}
    </Button>
  )
}
```

## 📄 License

[Your License Here]

## 🤝 Contributing

This is a private package extracted from shadcn-admin. For contributions, please refer to the main repository.

## 🔗 Links

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Figma Make Documentation](https://figma.com/make)
- [Tailwind CSS Documentation](https://tailwindcss.com)

