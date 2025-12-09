# ⚡ Quick Start - התחלה מהירה

## 🚀 3 צעדים להתחלה

### 1️⃣ התקנה
```bash
npm install -g pnpm
git clone https://github.com/[YOUR-USERNAME]/shadcn-admin.git
cd shadcn-admin
pnpm install
```

### 2️⃣ הרצה
```bash
pnpm run dev
```

### 3️⃣ פתח דפדפן
```
http://localhost:5173/
```

---

## 📚 איפה להמשיך?

### אם אתה תלמיד:
👉 קרא את [README-STUDENTS.md](./README-STUDENTS.md)

### אם אתה מורה:
👉 קרא את [README-TEACHER.md](./README-TEACHER.md)

### רוצה להתחיל לתרגל?
👉 עבור ל-[EXERCISES.md](./EXERCISES.md)

### צריך עזרה בהתקנה?
👉 ראה [SETUP.md](./SETUP.md)

---

## 🎯 תרגיל ראשון (2 דקות)

1. פתח את `src/features/dashboard/index.tsx`
2. שנה את הכותרת "Dashboard" ל-"לוח הבקרה שלי"
3. שמור ורענן את הדפדפן
4. 🎉 עשית את השינוי הראשון!

---

## 📖 מבנה מהיר

```
src/
├── components/     # קומפוננטים משותפים
├── features/       # פיצ'רים (dashboard, tasks, users)
├── routes/         # הגדרת דפים
└── styles/         # CSS
```

---

## 💡 פקודות שימושיות

```bash
pnpm run dev      # הרצה
pnpm run build    # Build לייצור
pnpm run lint     # בדיקת קוד
pnpm run format   # פורמט קוד
```

---

## ❓ בעיות?

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### "Port 5173 is already in use"
```bash
pnpm run dev -- --port 3000
```

### עוד בעיות?
👉 ראה [SETUP.md](./SETUP.md#-בעיות-נפוצות)

---

**זהו! עכשיו תתחיל ללמוד 🚀**

