# 🎯 תרגילים לתלמידים

## 📚 רמת קושי

- 🟢 **קל** - מתאים למתחילים
- 🟡 **בינוני** - דורש הבנה בסיסית של React
- 🔴 **מתקדם** - דורש ידע מעמיק

---

## 🟢 תרגילים קלים (רמה 1)

### תרגיל 1: שינוי צבעים
**מטרה:** ללמוד איך לשנות צבעים בפרויקט

1. פתח את `src/styles/theme.css`
2. שנה את הצבע הראשי (primary) לכחול:
   ```css
   --primary: 221 83% 53%;
   ```
3. שמור ורענן את הדפדפן

**בונוס:** נסה לשנות גם את צבע ה-background

---

### תרגיל 2: עריכת טקסט
**מטרה:** ללמוד איך למצוא ולערוך קומפוננטים

1. פתח את `src/features/dashboard/index.tsx`
2. מצא את הכותרת "Dashboard"
3. שנה אותה ל-"לוח הבקרה שלי"
4. שמור ורענן

**בונוס:** שנה גם את התיאור מתחת לכותרת

---

### תרגיל 3: הוספת כפתור
**מטרה:** ללמוד איך להשתמש בקומפוננטים מוכנים

1. פתח את `src/features/dashboard/index.tsx`
2. ייבא את קומפוננט Button:
   ```tsx
   import { Button } from '@/components/ui/button'
   ```
3. הוסף כפתור:
   ```tsx
   <Button onClick={() => alert('Hello!')}>לחץ עלי</Button>
   ```

**בונוס:** נסה variants שונים: `variant="destructive"`, `variant="outline"`

---

### תרגיל 4: שינוי הלוגו
**מטרה:** ללמוד איך לעבוד עם assets

1. מצא תמונה/לוגו שתרצה להשתמש בו
2. שים אותה ב-`public/images/`
3. פתח את `src/components/layout/app-sidebar.tsx`
4. שנה את הלוגו

**בונוס:** שנה גם את ה-favicon ב-`public/`

---

### תרגיל 5: הוספת אייקון
**מטרה:** ללמוד איך להשתמש ב-Lucide Icons

1. עבור ל-[Lucide Icons](https://lucide.dev/icons/)
2. בחר אייקון שאתה אוהב
3. ייבא אותו:
   ```tsx
   import { Heart } from 'lucide-react'
   ```
4. השתמש בו:
   ```tsx
   <Heart className="h-6 w-6 text-red-500" />
   ```

---

## 🟡 תרגילים בינוניים (רמה 2)

### תרגיל 6: יצירת קומפוננט Card פשוט
**מטרה:** ללמוד איך ליצור קומפוננט משלך

1. צור קובץ חדש: `src/components/my-card.tsx`
2. צור קומפוננט Card:
   ```tsx
   import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
   
   export function MyCard() {
     return (
       <Card>
         <CardHeader>
           <CardTitle>הכרטיס שלי</CardTitle>
         </CardHeader>
         <CardContent>
           <p>זה הקומפוננט הראשון שלי!</p>
         </CardContent>
       </Card>
     )
   }
   ```
3. השתמש בו ב-Dashboard

**בונוס:** הוסף props לקומפוננט (title, content)

---

### תרגיל 7: יצירת דף חדש
**מטרה:** ללמוד איך ליצור Route חדש

1. צור קובץ: `src/routes/_authenticated/my-page.tsx`
   ```tsx
   import { createFileRoute } from '@tanstack/react-router'
   
   export const Route = createFileRoute('/_authenticated/my-page')({
     component: MyPage,
   })
   
   function MyPage() {
     return (
       <div className="p-8">
         <h1 className="text-3xl font-bold">הדף שלי</h1>
         <p>זה הדף הראשון שיצרתי!</p>
       </div>
     )
   }
   ```
2. גלוש ל-`http://localhost:5173/my-page`

**בונוס:** הוסף את הדף ל-Sidebar

---

### תרגיל 8: הוספת פריט ל-Sidebar
**מטרה:** ללמוד איך לערוך את התפריט

1. פתח את `src/components/layout/data/sidebar-data.ts`
2. הוסף פריט חדש:
   ```tsx
   {
     title: 'הדף שלי',
     url: '/my-page',
     icon: Heart,
   }
   ```
3. ייבא את האייקון בראש הקובץ

**בונוס:** הוסף sub-menu עם מספר פריטים

---

### תרגיל 9: שימוש ב-State
**מטרה:** ללמוד useState

1. צור קומפוננט עם counter:
   ```tsx
   import { useState } from 'react'
   import { Button } from '@/components/ui/button'
   
   export function Counter() {
     const [count, setCount] = useState(0)
     
     return (
       <div className="space-y-4">
         <p className="text-2xl">ספירה: {count}</p>
         <Button onClick={() => setCount(count + 1)}>
           הוסף 1
         </Button>
       </div>
     )
   }
   ```

**בונוס:** הוסף כפתור להפחתה וכפתור לאיפוס

---

### תרגיל 10: יצירת טופס פשוט
**מטרה:** ללמוד React Hook Form

1. צור טופס עם שם ואימייל:
   ```tsx
   import { useForm } from 'react-hook-form'
   import { Button } from '@/components/ui/button'
   import { Input } from '@/components/ui/input'
   
   export function MyForm() {
     const { register, handleSubmit } = useForm()
     
     const onSubmit = (data) => {
       console.log(data)
       alert(`שלום ${data.name}!`)
     }
     
     return (
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <Input {...register('name')} placeholder="שם" />
         <Input {...register('email')} type="email" placeholder="אימייל" />
         <Button type="submit">שלח</Button>
       </form>
     )
   }
   ```

**בונוס:** הוסף Validation עם Zod

---

## 🔴 תרגילים מתקדמים (רמה 3)

### תרגיל 11: יצירת טבלה עם Data
**מטרה:** ללמוד TanStack Table

1. צור קובץ data: `src/features/my-feature/data/items.ts`
2. הגדר נתונים:
   ```tsx
   export const items = [
     { id: 1, name: 'פריט 1', status: 'פעיל' },
     { id: 2, name: 'פריט 2', status: 'לא פעיל' },
   ]
   ```
3. צור טבלה עם TanStack Table
4. הוסף מיון וסינון

**בונוס:** הוסף pagination

---

### תרגיל 12: שימוש ב-TanStack Query
**מטרה:** ללמוד Data Fetching

1. צור API call (או השתמש ב-fake API):
   ```tsx
   import { useQuery } from '@tanstack/react-query'
   import axios from 'axios'
   
   export function Users() {
     const { data, isLoading } = useQuery({
       queryKey: ['users'],
       queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users')
     })
     
     if (isLoading) return <div>טוען...</div>
     
     return (
       <div>
         {data?.data.map(user => (
           <div key={user.id}>{user.name}</div>
         ))}
       </div>
     )
   }
   ```

**בונוס:** הוסף error handling ו-refetch

---

### תרגיל 13: יצירת Store עם Zustand
**מטרה:** ללמוד State Management גלובלי

1. צור store: `src/stores/counter-store.ts`
   ```tsx
   import { create } from 'zustand'
   
   interface CounterState {
     count: number
     increment: () => void
     decrement: () => void
     reset: () => void
   }
   
   export const useCounterStore = create<CounterState>((set) => ({
     count: 0,
     increment: () => set((state) => ({ count: state.count + 1 })),
     decrement: () => set((state) => ({ count: state.count - 1 })),
     reset: () => set({ count: 0 }),
   }))
   ```
2. השתמש בו בקומפוננטים שונים

**בונוס:** הוסף persist (שמירה ב-LocalStorage)

---

### תרגיל 14: יצירת Dashboard עם גרפים
**מטרה:** ללמוד Recharts

1. צור קומפוננט עם גרף:
   ```tsx
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
   
   const data = [
     { name: 'ינואר', value: 400 },
     { name: 'פברואר', value: 300 },
     { name: 'מרץ', value: 600 },
   ]
   
   export function MyChart() {
     return (
       <LineChart width={500} height={300} data={data}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Line type="monotone" dataKey="value" stroke="#8884d8" />
       </LineChart>
     )
   }
   ```

**בונוס:** הוסף BarChart, PieChart

---

### תרגיל 15: יצירת Feature מלא
**מטרה:** לשלב את כל מה שלמדת

צור feature "Products" (מוצרים) עם:
1. דף רשימת מוצרים (טבלה)
2. דף הוספת מוצר (טופס)
3. דף עריכת מוצר
4. מחיקת מוצר (עם Dialog אישור)
5. State Management עם Zustand
6. Routing עם TanStack Router

**מבנה:**
```
src/features/products/
├── components/
│   ├── products-table.tsx
│   ├── product-form.tsx
│   └── columns.tsx
├── data/
│   ├── schema.ts
│   └── products.ts
└── index.tsx
```

---

## 🎓 פרויקטים סופיים

### פרויקט 1: מערכת ניהול משימות
- CRUD מלא (Create, Read, Update, Delete)
- סינון לפי סטטוס
- מיון לפי תאריך
- חיפוש
- סטטיסטיקות (כמה משימות הושלמו)

### פרויקט 2: מערכת ניהול לקוחות (CRM)
- רשימת לקוחות
- הוספת לקוח חדש
- פרופיל לקוח
- היסטוריית פעולות
- גרפים של מכירות

### פרויקט 3: Blog Admin
- רשימת פוסטים
- כתיבת פוסט חדש (עם Rich Text Editor)
- עריכת פוסט
- קטגוריות
- תגיות
- סטטיסטיקות צפיות

---

## 💡 טיפים

1. **התחל מהקל לקשה** - אל תדלג על התרגילים הקלים
2. **קרא את הקוד** - למד מהקוד הקיים בפרויקט
3. **השתמש ב-DevTools** - React DevTools עוזר מאוד
4. **חפש בדוקומנטציה** - כל ספרייה יש לה דוקומנטציה מעולה
5. **נסה בעצמך** - אל תעתיק קוד, נסה לכתוב בעצמך
6. **שאל שאלות** - אם אתה תקוע, פתח Issue

---

## 📚 משאבים נוספים

- [React Tutorial](https://react.dev/learn)
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TailwindCSS Playground](https://play.tailwindcss.com/)
- [ShadcnUI Examples](https://ui.shadcn.com/examples)

---

**בהצלחה! 🚀**

זכור: כל מתכנת מקצועי התחיל מהבסיס. תתאמן, תתנסה, ותלמד מטעויות!

