# 🚀 העלאת הפרויקט לגיטהאב

## שלב 1: צור Repository חדש בגיטהאב

1. היכנס ל-[GitHub](https://github.com)
2. לחץ על **"New Repository"** או **"+"** → **"New repository"**
3. מלא את הפרטים:
   - **Repository name:** `shadcn-admin` (או כל שם שתרצה)
   - **Description:** "Admin Dashboard built with React, TypeScript, TailwindCSS, and ShadcnUI"
   - **Public** או **Private** (לפי הבחירה שלך)
   - **אל תסמן** "Initialize with README" (יש לנו כבר)
4. לחץ **"Create repository"**

---

## שלב 2: חבר את הפרויקט המקומי לגיטהאב

פתח טרמינל בתיקיית הפרויקט והרץ:

### אם זה פרויקט חדש (לא שכפלת מגיטהאב):

```bash
# אתחול Git (אם עוד לא עשית)
git init

# הוסף את כל הקבצים
git add .

# צור Commit ראשון
git commit -m "Initial commit: Shadcn Admin Dashboard for students"

# הוסף את הקישור לגיטהאב (החלף [USERNAME] ו-[REPO-NAME])
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git

# העלה לגיטהאב
git branch -M main
git push -u origin main
```

### אם שכפלת את הפרויקט המקורי:

```bash
# הסר את הקישור למקור
git remote remove origin

# הוסף את הקישור שלך (החלף [USERNAME] ו-[REPO-NAME])
git remote add origin https://github.com/[USERNAME]/[REPO-NAME].git

# העלה לגיטהאב
git push -u origin main
```

---

## שלב 3: עדכן את הקבצים

### עדכן את README.md

פתח את `README.md` ושנה:

```markdown
# 🎓 Shadcn Admin - פרויקט לתלמידים

Admin Dashboard מודרני לתרגול React, TypeScript, TailwindCSS ו-ShadcnUI.

## 📚 מדריכים

- [README לתלמידים](./README-STUDENTS.md) - מדריך מלא בעברית
- [הוראות התקנה](./SETUP.md) - התקנה מהירה
- [מבנה הפרויקט](./PROJECT-STRUCTURE.md) - הסבר על כל תיקייה

## 🚀 התחלה מהירה

\`\`\`bash
# התקנת pnpm
npm install -g pnpm

# שכפול הפרויקט
git clone https://github.com/[YOUR-USERNAME]/shadcn-admin.git
cd shadcn-admin

# התקנת תלויות
pnpm install

# הרצת הפרויקט
pnpm run dev
\`\`\`

הפרויקט יהיה זמין ב: http://localhost:5173/

## 📖 טכנולוגיות

- React 19
- TypeScript
- TailwindCSS
- ShadcnUI
- TanStack Router
- TanStack Query
- Zustand
- Vite

## 📝 רישיון

MIT License - מבוסס על [shadcn-admin](https://github.com/satnaing/shadcn-admin)
\`\`\`

---

## שלב 4: הוסף קובץ LICENSE (אופציונלי)

אם אתה רוצה לשמור על רישיון MIT:

```bash
# הקובץ כבר קיים, אבל אפשר לעדכן אותו
```

---

## שלב 5: הגדר GitHub Pages (אופציונלי)

אם תרצה לפרסם את הפרויקט אונליין:

### 1. הוסף קובץ GitHub Actions

צור `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
\`\`\`

### 2. הפעל GitHub Pages

1. עבור ל-**Settings** → **Pages**
2. תחת **Source** בחר **"gh-pages"** branch
3. לחץ **Save**

הפרויקט יהיה זמין ב: `https://[USERNAME].github.io/[REPO-NAME]/`

---

## שלב 6: הוסף Badge לREADME (אופציונלי)

הוסף badges יפים ל-README:

\`\`\`markdown
![GitHub stars](https://img.shields.io/github/stars/[USERNAME]/[REPO-NAME]?style=social)
![GitHub forks](https://img.shields.io/github/forks/[USERNAME]/[REPO-NAME]?style=social)
![GitHub issues](https://img.shields.io/github/issues/[USERNAME]/[REPO-NAME])
![License](https://img.shields.io/github/license/[USERNAME]/[REPO-NAME])
\`\`\`

---

## 📝 פקודות Git שימושיות

### שמירת שינויים
\`\`\`bash
git add .
git commit -m "הודעת commit"
git push
\`\`\`

### יצירת Branch חדש
\`\`\`bash
git checkout -b feature/new-feature
git push -u origin feature/new-feature
\`\`\`

### מיזוג שינויים
\`\`\`bash
git checkout main
git merge feature/new-feature
git push
\`\`\`

### ביטול שינויים
\`\`\`bash
# ביטול שינויים שלא נשמרו
git checkout .

# ביטול commit אחרון (שמירת השינויים)
git reset --soft HEAD~1

# ביטול commit אחרון (מחיקת השינויים)
git reset --hard HEAD~1
\`\`\`

---

## 🎯 המלצות

### 1. הוסף .gitignore
ודא ש-.gitignore כולל:
\`\`\`
node_modules/
dist/
.env
.DS_Store
*.log
\`\`\`

### 2. הוסף CONTRIBUTING.md
אם תרצה שתלמידים יתרמו:
\`\`\`markdown
# תרומה לפרויקט

1. Fork את הפרויקט
2. צור Branch חדש (\`git checkout -b feature/AmazingFeature\`)
3. Commit את השינויים (\`git commit -m 'Add some AmazingFeature'\`)
4. Push ל-Branch (\`git push origin feature/AmazingFeature\`)
5. פתח Pull Request
\`\`\`

### 3. הוסף Issues Templates
צור `.github/ISSUE_TEMPLATE/bug_report.md` ו-`feature_request.md`

### 4. הוסף Code of Conduct
צור `CODE_OF_CONDUCT.md` עם כללי התנהגות

---

## ❓ שאלות נפוצות

### איך אני מעדכן את הפרויקט?
\`\`\`bash
git add .
git commit -m "תיאור השינוי"
git push
\`\`\`

### איך אני משתף עם תלמידים?
שלח להם את הקישור:
\`\`\`
https://github.com/[USERNAME]/[REPO-NAME]
\`\`\`

### איך תלמידים משכפלים?
\`\`\`bash
git clone https://github.com/[USERNAME]/[REPO-NAME].git
\`\`\`

---

**בהצלחה! 🎉**

אם יש בעיות, פתח Issue בגיטהאב או שלח מייל.

