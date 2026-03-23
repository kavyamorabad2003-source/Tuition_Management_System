---
description: How to set up and develop the Next.js frontend for the Tuition Management System (deployed on Vercel)
---

# Frontend Setup Skill (Next.js + Vercel)

## Prerequisites
- Node.js 18+
- npm

## Steps

### 1. Initialize the Frontend
```bash
cd frontend
npx -y create-next-app@latest ./ --js --no-tailwind --no-eslint --src-dir --app --no-turbopack --import-alias "@/*"
```

### 2. Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.js       # Root layout
│   │   ├── page.js          # Home page
│   │   ├── globals.css      # Global styles (vanilla CSS)
│   │   ├── students/        # Student pages
│   │   ├── tutors/          # Tutor pages
│   │   ├── classes/         # Class pages
│   │   └── payments/        # Payment pages
│   ├── components/          # Reusable UI components
│   └── lib/                 # API helpers, utilities
├── public/                  # Static assets
├── next.config.js
├── package.json
└── README.md
```

### 3. Styling Approach
- **Use vanilla CSS** (`globals.css` + CSS Modules) wherever possible
- CSS Modules: `ComponentName.module.css` alongside each component
- Avoid CSS-in-JS or Tailwind unless explicitly requested
- Use CSS custom properties for theming:
  ```css
  :root {
    --primary: #4F46E5;
    --bg: #0F172A;
    --text: #F8FAFC;
  }
  ```

### 4. Running Locally
```bash
cd frontend
npm run dev
```
Opens at `http://localhost:3000`

### 5. Vercel Deployment
1. Push to GitHub
2. Import project in Vercel dashboard
3. Set root directory to `frontend/`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = Render backend URL

### 6. Best Practices
- Use semantic HTML (`<section>`, `<nav>`, `<main>`, `<article>`)
- Prefer plain HTML/CSS over heavy component libraries
- Use Next.js `<Image>` for optimized images
- Use `<Link>` for client-side navigation
- Keep API calls in `lib/api.js` for centralization
