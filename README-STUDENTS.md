# 🎓 Shadcn Admin - מדריך לתלמידים

## 📖 מה זה הפרויקט?

זהו פרויקט Admin Dashboard מודרני שנבנה עם הטכנולוגיות החדישות ביותר ב-React.
הפרויקט מכיל דוגמאות רבות לדפים, קומפוננטים, וטכניקות עבודה מקצועיות.

## 🛠️ טכנולוגיות בפרויקט

### ליבה
- **React 19** - ספריית ה-UI המובילה
- **TypeScript** - JavaScript עם בטיחות טיפוסים
- **Vite** - כלי Build מהיר וחזק

### עיצוב
- **TailwindCSS** - CSS Utility-First
- **ShadcnUI** - קומפוננטים מוכנים ויפים
- **RadixUI** - קומפוננטים נגישים (Accessible)
- **Lucide Icons** - אייקונים

### ניהול State ו-Data
- **TanStack Router** - ניווט מתקדם (Routing)
- **TanStack Query** - ניהול Data Fetching
- **Zustand** - ניהול State גלובלי
- **React Hook Form** - ניהול טפסים
- **Zod** - Validation

### נוספים
- **Recharts** - גרפים וצ'ארטים
- **date-fns** - עבודה עם תאריכים
- **Axios** - HTTP Requests

## 📁 מבנה הפרויקט

```
src/
├── assets/          # תמונות, אייקונים, לוגואים
├── components/      # קומפוננטים משותפים
│   ├── ui/         # קומפוננטי ShadcnUI
│   ├── layout/     # קומפוננטי Layout (Sidebar, Header)
│   └── ...         # קומפוננטים נוספים
├── features/        # פיצ'רים לפי נושא
│   ├── dashboard/  # דף הבית
│   ├── tasks/      # ניהול משימות
│   ├── users/      # ניהול משתמשים
│   ├── auth/       # התחברות והרשמה
│   └── ...
├── routes/          # הגדרת Routes (TanStack Router)
├── hooks/           # Custom Hooks
├── lib/             # פונקציות עזר
├── context/         # React Context Providers
├── stores/          # Zustand Stores
└── styles/          # קבצי CSS

```

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 18 ומעלה)
- pnpm (מנהל חבילות)

### התקנת pnpm
```bash
npm install -g pnpm
```

### התקנת הפרויקט
```bash
# שכפול הפרויקט
git clone [YOUR-REPO-URL]

# כניסה לתיקייה
cd shadcn-admin

# התקנת תלויות
pnpm install

# הרצת שרת הפיתוח
pnpm run dev
```

הפרויקט יהיה זמין בכתובת: http://localhost:5173/

## 📚 דפים בפרויקט

### דפים ראשיים
- **Dashboard** (`/`) - דף הבית עם סטטיסטיקות
- **Tasks** (`/tasks`) - ניהול משימות עם טבלה מתקדמת
- **Users** (`/users`) - ניהול משתמשים
- **Chats** (`/chats`) - ממשק צ'אט
- **Apps** (`/apps`) - רשימת אפליקציות
- **Settings** (`/settings`) - הגדרות (Profile, Account, Appearance, Display, Notifications)

### דפי Authentication (Clerk)
- **Sign In** (`/sign-in`) - התחברות
- **Sign Up** (`/sign-up`) - הרשמה
- **Forgot Password** (`/forgot-password`) - שחזור סיסמה
- **OTP** (`/otp`) - אימות דו-שלבי

### דפי שגיאות
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Server Error
- **503** - Maintenance

## 🎨 קומפוננטים מרכזיים

### Layout Components
- `AppSidebar` - תפריט צד
- `Header` - כותרת עליונה
- `TopNav` - ניווט עליון
- `NavUser` - תפריט משתמש

### UI Components (ShadcnUI)
- `Button`, `Input`, `Select`, `Checkbox`
- `Dialog`, `Sheet`, `Popover`
- `Table`, `Card`, `Badge`
- `Tabs`, `Accordion`, `Dropdown`
- ועוד הרבה...

### Custom Components
- `DataTable` - טבלה מתקדמת עם מיון, סינון, pagination
- `DatePicker` - בחירת תאריך
- `PasswordInput` - שדה סיסמה עם הצגה/הסתרה
- `ThemeSwitch` - מעבר בין מצב בהיר/כהה
- `CommandMenu` - חיפוש גלובלי (Cmd+K / Ctrl+K)

## 🔑 פיצ'רים מיוחדים

### 🌓 Dark Mode
הפרויקט תומך במצב כהה/בהיר עם שמירה ב-LocalStorage

### 🔍 Global Search
לחץ `Cmd+K` (Mac) או `Ctrl+K` (Windows) לפתיחת חיפוש גלובלי

### 📱 Responsive Design
הפרויקט מותאם לכל המסכים - מובייל, טאבלט, דסקטופ

### ♿ Accessibility
כל הקומפוננטים נבנו עם נגישות (A11y) בראש

### 🌍 RTL Support
תמיכה בשפות מימין לשמאל (עברית, ערבית)

## 💡 טיפים ללמידה

### 1. התחל מהבסיס
- בדוק את `src/main.tsx` - נקודת הכניסה
- עבור ל-`src/routes/__root.tsx` - Root Layout
- הבן איך TanStack Router עובד

### 2. למד מהקומפוננטים
- פתח `src/components/ui/` - קומפוננטי בסיס
- בדוק איך משתמשים בהם ב-`src/features/`

### 3. נסה לשנות
- שנה צבעים ב-`src/styles/theme.css`
- הוסף דף חדש ב-`src/routes/`
- צור קומפוננט משלך

### 4. השתמש בכלי הפיתוח
- **React DevTools** - לבדיקת קומפוננטים
- **TanStack Query DevTools** - לבדיקת Queries (פינה שמאלית למטה)
- **TanStack Router DevTools** - לבדיקת Routes (פינה ימנית למטה)

## 📖 משאבים נוספים

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [ShadcnUI Components](https://ui.shadcn.com/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)

## 🎯 תרגילים מומלצים

### רמה 1 - בסיסי
1. שנה את הצבעים של הכפתורים
2. הוסף טקסט חדש לדף הבית
3. שנה את הלוגו

### רמה 2 - בינוני
1. צור דף חדש עם Route משלך
2. הוסף קומפוננט Card חדש
3. שנה את מבנה ה-Sidebar

### רמה 3 - מתקדם
1. צור טופס עם Validation
2. הוסף טבלה עם מיון וסינון
3. הוסף API Call עם TanStack Query

## ⚠️ הערות חשובות

### Authentication (Clerk)
הפרויקט משתמש ב-Clerk לאימות. אם אתה לא צריך את זה:
- אפשר להתעלם מדפי ה-Auth
- או להסיר את `@clerk/clerk-react` מה-dependencies

### Environment Variables
אם תרצה להשתמש ב-Clerk או API אחר, תצטרך ליצור קובץ `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_key_here
```

### Build לייצור
```bash
pnpm run build
pnpm run preview
```

## 🤝 תרומה לפרויקט

הפרויקט המקורי: [shadcn-admin](https://github.com/satnaing/shadcn-admin)

אם מצאת באג או רוצה להוסיף פיצ'ר - פתח Issue או Pull Request!

## 📝 רישיון

MIT License - אפשר להשתמש בחופשיות

---

**בהצלחה בלמידה! 🚀**

אם יש שאלות - תמיד אפשר לפתוח Issue בגיטהאב

