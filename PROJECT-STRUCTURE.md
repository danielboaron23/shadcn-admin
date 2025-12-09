# 📁 מבנה הפרויקט - הסבר מפורט

## 🌳 עץ התיקיות

```
shadcn-admin/
├── public/                 # קבצים סטטיים (תמונות, favicon)
├── src/                   # קוד המקור
│   ├── assets/           # אייקונים ולוגואים
│   ├── components/       # קומפוננטים משותפים
│   ├── config/           # קבצי הגדרות
│   ├── context/          # React Context Providers
│   ├── features/         # פיצ'רים לפי נושא
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # פונקציות עזר
│   ├── routes/           # הגדרות Routing
│   ├── stores/           # Zustand State Management
│   ├── styles/           # קבצי CSS
│   └── main.tsx          # נקודת הכניסה
├── package.json          # תלויות ופקודות
├── vite.config.ts        # הגדרות Vite
├── tsconfig.json         # הגדרות TypeScript
└── tailwind.config.js    # הגדרות TailwindCSS
```

---

## 📂 הסבר מפורט לכל תיקייה

### 📁 `src/assets/`
**מטרה:** אייקונים, לוגואים, ותמונות שמשמשות בקוד

```
assets/
├── brand-icons/          # אייקונים של מותגים (GitHub, Discord, וכו')
│   ├── icon-github.tsx
│   ├── icon-discord.tsx
│   └── ...
├── custom/               # אייקונים מותאמים אישית
│   ├── icon-theme-dark.tsx
│   ├── icon-theme-light.tsx
│   └── ...
├── clerk-logo.tsx        # לוגו של Clerk
└── logo.tsx              # לוגו ראשי
```

**שימוש:**
```tsx
import { Logo } from '@/assets/logo'
import { IconGithub } from '@/assets/brand-icons'
```

---

### 📁 `src/components/`
**מטרה:** קומפוננטים משותפים לכל הפרויקט

```
components/
├── ui/                   # קומפוננטי ShadcnUI
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ... (40+ קומפוננטים)
├── layout/               # קומפוננטי Layout
│   ├── app-sidebar.tsx   # תפריט צד
│   ├── header.tsx        # כותרת עליונה
│   ├── top-nav.tsx       # ניווט עליון
│   └── authenticated-layout.tsx
├── data-table/           # קומפוננטים לטבלאות
│   ├── pagination.tsx
│   ├── toolbar.tsx
│   └── ...
└── [קומפוננטים נוספים]
```

#### `components/ui/` - ShadcnUI
קומפוננטי בסיס שניתן להתאים אישית:
- `button.tsx` - כפתורים
- `input.tsx` - שדות קלט
- `dialog.tsx` - חלונות מודאליים
- `table.tsx` - טבלאות
- `card.tsx` - כרטיסים
- ועוד...

**שימוש:**
```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

<Button variant="default">Click me</Button>
<Input type="text" placeholder="Enter text" />
```

#### `components/layout/`
קומפוננטים שמגדירים את המבנה של העמוד:
- **AppSidebar** - תפריט צד עם ניווט
- **Header** - כותרת עליונה עם חיפוש ופרופיל
- **TopNav** - ניווט עליון (אלטרנטיבה ל-Sidebar)
- **AuthenticatedLayout** - Layout למשתמשים מחוברים

---

### 📁 `src/features/`
**מטרה:** פיצ'רים מלאים לפי נושא (Feature-based architecture)

```
features/
├── dashboard/            # דף הבית
│   ├── components/       # קומפוננטים ייחודיים ל-Dashboard
│   └── index.tsx         # הקומפוננט הראשי
├── tasks/                # ניהול משימות
│   ├── components/       # קומפוננטים של Tasks
│   ├── data/            # נתוני דמה
│   └── index.tsx
├── users/                # ניהול משתמשים
│   ├── components/
│   ├── data/
│   └── index.tsx
├── auth/                 # התחברות והרשמה
│   ├── sign-in/
│   ├── sign-up/
│   ├── forgot-password/
│   └── otp/
├── settings/             # הגדרות
│   ├── profile/
│   ├── account/
│   ├── appearance/
│   └── ...
├── chats/                # ממשק צ'אט
└── errors/               # דפי שגיאות
```

**עיקרון Feature-based:**
כל פיצ'ר הוא תיקייה עצמאית עם:
- `components/` - קומפוננטים ייחודיים לפיצ'ר
- `data/` - נתונים וטיפוסים
- `index.tsx` - הקומפוננט הראשי

**דוגמה: Tasks Feature**
```
tasks/
├── components/
│   ├── tasks-table.tsx      # טבלת משימות
│   ├── task-form.tsx        # טופס יצירת משימה
│   ├── columns.tsx          # הגדרת עמודות
│   └── ...
├── data/
│   ├── schema.ts            # Zod Schema
│   └── tasks.ts             # נתוני דמה
└── index.tsx                # הדף הראשי
```

---

### 📁 `src/routes/`
**מטרה:** הגדרת Routes עם TanStack Router

```
routes/
├── __root.tsx                    # Root Layout (כולל Toaster, DevTools)
├── _authenticated/               # Routes שדורשים התחברות
│   ├── route.tsx                # Layout למשתמשים מחוברים
│   ├── index.tsx                # דף הבית (/)
│   ├── tasks/
│   │   └── index.tsx            # (/tasks)
│   ├── users/
│   │   └── index.tsx            # (/users)
│   └── settings/
│       ├── route.tsx            # Layout של Settings
│       ├── index.tsx            # (/settings)
│       ├── profile.tsx          # (/settings/profile)
│       └── ...
├── (auth)/                      # Routes של Authentication
│   ├── sign-in.tsx             # (/sign-in)
│   ├── sign-up.tsx             # (/sign-up)
│   └── ...
└── (errors)/                    # דפי שגיאות
    ├── 404.tsx                 # (/404)
    ├── 500.tsx                 # (/500)
    └── ...
```

**איך זה עובד:**
- `__root.tsx` - Root של כל האפליקציה
- `_authenticated/` - Prefix עם `_` = Layout Route
- `(auth)/` - Prefix עם `()` = Route Group (לא משפיע על URL)

**דוגמה:**
```tsx
// routes/_authenticated/tasks/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Tasks } from '@/features/tasks'

export const Route = createFileRoute('/_authenticated/tasks/')({
  component: Tasks,
})
```

---

### 📁 `src/hooks/`
**מטרה:** Custom React Hooks

```
hooks/
├── use-mobile.tsx           # בדיקה אם המכשיר הוא מובייל
├── use-dialog-state.tsx     # ניהול state של Dialog
└── use-table-url-state.ts   # ניהול state של טבלה ב-URL
```

**דוגמה:**
```tsx
import { useMobile } from '@/hooks/use-mobile'

function MyComponent() {
  const isMobile = useMobile()
  
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```

---

### 📁 `src/lib/`
**מטרה:** פונקציות עזר ו-Utilities

```
lib/
├── utils.ts                 # פונקציות כלליות (cn, formatDate, וכו')
├── cookies.ts               # עבודה עם Cookies
├── handle-server-error.ts   # טיפול בשגיאות שרת
└── show-submitted-data.tsx  # הצגת נתוני טופס (לדבאג)
```

**הפונקציה החשובה ביותר: `cn()`**
```tsx
import { cn } from '@/lib/utils'

// מאחד classes של TailwindCSS
<div className={cn('text-lg', isActive && 'font-bold', className)} />
```

---

### 📁 `src/context/`
**מטרה:** React Context Providers

```
context/
├── theme-provider.tsx       # ניהול Theme (Dark/Light)
├── font-provider.tsx        # ניהול פונטים
├── direction-provider.tsx   # ניהול כיוון (LTR/RTL)
├── layout-provider.tsx      # ניהול Layout
└── search-provider.tsx      # ניהול חיפוש גלובלי
```

**שימוש:**
```tsx
// main.tsx
<ThemeProvider>
  <FontProvider>
    <DirectionProvider>
      <App />
    </DirectionProvider>
  </FontProvider>
</ThemeProvider>
```

---

### 📁 `src/stores/`
**מטרה:** Zustand State Management

```
stores/
└── auth-store.ts            # ניהול state של Authentication
```

**דוגמה:**
```tsx
import { useAuthStore } from '@/stores/auth-store'

function MyComponent() {
  const { user, login, logout } = useAuthStore()
  
  return <div>Hello {user?.name}</div>
}
```

---

### 📁 `src/styles/`
**מטרה:** קבצי CSS גלובליים

```
styles/
├── index.css                # CSS ראשי (imports)
└── theme.css                # הגדרות צבעים ו-Theme
```

**theme.css** - משתני CSS:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

---

### 📁 `src/config/`
**מטרה:** קבצי הגדרות

```
config/
└── fonts.ts                 # הגדרות פונטים
```

---

## 🔑 קבצים חשובים בשורש

### `package.json`
מגדיר:
- **dependencies** - חבילות לייצור
- **devDependencies** - חבילות לפיתוח
- **scripts** - פקודות (dev, build, lint)

### `vite.config.ts`
הגדרות Vite:
- Plugins (React, TailwindCSS, TanStack Router)
- Alias (`@` = `src/`)
- Build settings

### `tsconfig.json`
הגדרות TypeScript:
- Target (ES2020)
- Module (ESNext)
- Strict mode
- Path aliases

### `components.json`
הגדרות ShadcnUI:
- Style (default/new-york)
- Base color
- CSS variables
- Aliases

---

## 🎯 זרימת הקוד

### 1. נקודת כניסה
```
index.html → src/main.tsx → src/routes/__root.tsx
```

### 2. Routing
```
TanStack Router → routes/ → features/
```

### 3. קומפוננטים
```
features/ → components/ → components/ui/
```

---

## 💡 טיפים

### איך למצוא משהו?
1. **קומפוננט UI?** → `components/ui/`
2. **דף מסוים?** → `features/` או `routes/`
3. **Hook?** → `hooks/`
4. **פונקציית עזר?** → `lib/`
5. **State גלובלי?** → `stores/` או `context/`

### איך להוסיף דף חדש?
1. צור קובץ ב-`routes/` (למשל `routes/_authenticated/my-page.tsx`)
2. צור feature ב-`features/my-page/`
3. חבר ביניהם

### איך להוסיף קומפוננט UI?
```bash
npx shadcn@latest add [component-name]
```

---

**זהו! עכשיו אתה מכיר את כל המבנה 🎉**

