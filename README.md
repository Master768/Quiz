# Premium Quiz Platform

A high-performance, visually stunning quiz application built with Next.js, Tailwind CSS, and Framer Motion. This app allows users to upload Excel sheets to generate dynamic, real-time validated quizzes.

## Features
- **Excel Driven**: Upload `.xlsx` or `.csv` files with a specific header structure.
- **Single Page Experience**: All questions appear on one scrollable page.
- **Real-time Validation**: Instant feedback (Green/Red) on selection.
- **Premium UI**: Dark blue and white theme with glassmorphism and smooth animations.
- **Analytics**: Performance dashboard with charts.

## Header Structure
Your Excel file should have the following headers:
`Question`, `Option A`, `Option B`, `Option C`, `Option D`, `Answer`, `POINT`

## Getting Started

### 1. Initialize the project
Since I cannot run commands on your system, please run:
```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

### 2. Install dependencies
```powershell
npm install xlsx framer-motion recharts lucide-react clsx tailwind-merge
```

### 3. Run the development server
```powershell
npm run dev
```
