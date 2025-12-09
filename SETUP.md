# 🚀 הוראות התקנה מהירות

## שלב 1: דרישות מקדימות

ודא שיש לך מותקן:
- **Node.js** (גרסה 18 ומעלה) - [הורד כאן](https://nodejs.org/)
- **Git** - [הורד כאן](https://git-scm.com/)

## שלב 2: התקנת pnpm

pnpm הוא מנהל חבילות מהיר יותר מ-npm.

### Windows
```bash
npm install -g pnpm
```

### Mac/Linux
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

או:
```bash
npm install -g pnpm
```

## שלב 3: שכפול הפרויקט

```bash
git clone https://github.com/[YOUR-USERNAME]/shadcn-admin.git
cd shadcn-admin
```

## שלב 4: התקנת תלויות

```bash
pnpm install
```

⏱️ זה ייקח כ-1-2 דקות

## שלב 5: הרצת הפרויקט

```bash
pnpm run dev
```

הפרויקט יהיה זמין בכתובת: **http://localhost:5173/**

## 🎉 זהו! הפרויקט רץ

פתח את הדפדפן וגלוש ל-http://localhost:5173/

---

## 🔧 פקודות נוספות

### Build לייצור
```bash
pnpm run build
```

### צפייה ב-Build
```bash
pnpm run preview
```

### בדיקת Linting
```bash
pnpm run lint
```

### פורמט קוד
```bash
pnpm run format
```

---

## ❓ בעיות נפוצות

### בעיה: "pnpm: command not found"
**פתרון:** התקן את pnpm:
```bash
npm install -g pnpm
```

### בעיה: "Port 5173 is already in use"
**פתרון:** סגור תהליכים אחרים על הפורט או שנה את הפורט:
```bash
pnpm run dev -- --port 3000
```

### בעיה: שגיאות התקנה
**פתרון:** נקה cache והתקן מחדש:
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

---

## 📝 הערות

- אם אתה משתמש ב-**npm** במקום pnpm, תצטרך למחוק את `pnpm-lock.yaml` ולהריץ `npm install`
- הפרויקט דורש **Node.js 18+** - בדוק את הגרסה שלך עם `node --version`
- אם יש בעיות עם הרשאות, נסה להריץ עם `sudo` (Mac/Linux) או כ-Administrator (Windows)

---

**בהצלחה! 🎓**

