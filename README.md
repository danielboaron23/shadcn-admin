# 🎓 Shadcn Admin - פרויקט לתלמידים

Admin Dashboard מודרני לתרגול React, TypeScript, TailwindCSS ו-ShadcnUI.

![alt text](public/images/shadcn-admin.png)

> פרויקט זה מבוסס על [shadcn-admin](https://github.com/satnaing/shadcn-admin) והותאם לשימוש חינוכי.

## 📚 מדריכים מלאים בעברית

### 🚀 התחלה
- **[⚡ Quick Start](./QUICKSTART.md)** - התחלה מהירה ב-3 צעדים
- **[🚀 הוראות התקנה](./SETUP.md)** - התקנה מפורטת והרצת הפרויקט

### 📖 למידה
- **[📖 מדריך לתלמידים](./README-STUDENTS.md)** - מדריך מקיף על הפרויקט וטכנולוגיות
- **[📁 מבנה הפרויקט](./PROJECT-STRUCTURE.md)** - הסבר מפורט על כל תיקייה וקובץ
- **[🎯 תרגילים](./EXERCISES.md)** - 15 תרגילים מדורגים + 3 פרויקטים סופיים

### 👨‍🏫 למורים
- **[👨‍🏫 מדריך למורה](./README-TEACHER.md)** - תכנית לימודים, טיפים, והמלצות
- **[✅ TODO](./TODO.md)** - רשימת מטלות להכנת הפרויקט

### 🔧 נוספים
- **[🔧 העלאה לגיטהאב](./GITHUB-SETUP.md)** - הוראות להעלאת הפרויקט לגיטהאב
- **[📋 סיכום](./SUMMARY.md)** - סיכום כל השינויים והתאמות

## Features

- Light/dark mode
- Responsive
- Accessible
- With built-in Sidebar component
- Global search command
- 10+ pages
- Extra custom components
- RTL support

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `src/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Auth (partial):** [Clerk](https://go.clerk.com/GttUAaK)

## 🚀 התחלה מהירה

### התקנת pnpm (פעם אחת)
```bash
npm install -g pnpm
```

### שכפול והרצה
```bash
# שכפול הפרויקט
git clone https://github.com/[YOUR-USERNAME]/shadcn-admin.git
cd shadcn-admin

# התקנת תלויות
pnpm install

# הרצת הפרויקט
pnpm run dev
```

הפרויקט יהיה זמין ב: **http://localhost:5173/**

📖 **למדריך מפורט:** ראה [SETUP.md](./SETUP.md)

## 🎯 מה תלמדו בפרויקט?

- ✅ **React 19** - Components, Hooks, State Management
- ✅ **TypeScript** - Type Safety, Interfaces, Generics
- ✅ **TailwindCSS** - Utility-First CSS, Responsive Design
- ✅ **ShadcnUI** - Modern UI Components
- ✅ **TanStack Router** - File-based Routing
- ✅ **TanStack Query** - Data Fetching & Caching
- ✅ **React Hook Form** - Form Management
- ✅ **Zustand** - State Management
- ✅ **Zod** - Schema Validation

## 📖 תכנית לימודים מוצעת

1. **שבוע 1-2:** בסיס - הכרת הפרויקט, תרגילים קלים
2. **שבוע 3-4:** קומפוננטים - יצירת קומפוננטים, Props, State
3. **שבוע 5-6:** Routing ו-Data - TanStack Router, API Calls
4. **שבוע 7-8:** פרויקט סופי - CRUD מלא, UI מלוטש

📚 **למדריך מלא למורה:** ראה [README-TEACHER.md](./README-TEACHER.md)

## 🙏 קרדיטים

פרויקט זה מבוסס על [shadcn-admin](https://github.com/satnaing/shadcn-admin) מאת [@satnaing](https://github.com/satnaing)

תודה ל-[Clerk](https://go.clerk.com/GttUAaK) על החסות של הפרויקט המקורי

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
