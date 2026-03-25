# 📘 Tuition Management System — Project Document

> **Last Updated:** 2026-03-25

---

## 1. Project Overview

A full-stack **Tuition Management System** for managing students, tutors, classes, payments, and schedules.

| Layer      | Technology          | Hosting   |
|------------|---------------------|-----------|
| Frontend   | Next.js (HTML/CSS)  | Vercel    |
| Backend    | FastAPI (Python)    | Render    |
| Database   | PostgreSQL          | Neon      |

---

## 2. Project Structure

```
Tuition_Management_System/
├── db/                  # Database schemas, migrations, seed data
├── backend/             # FastAPI application
├── frontend/            # Next.js application
├── PROJECT_TRACKER.md   # This file — master project document
└── README.md            # Quick-start guide
```

---

## 3. Finalized Steps

### Step 1 — Project Initialization (2026-03-23)
- ✅ Created project folder structure: `db/`, `backend/`, `frontend/`
- ✅ Created `PROJECT_TRACKER.md` to track all finalized decisions
- ✅ Created skills for each section (`db-setup`, `backend-setup`, `frontend-setup`)

### Step 2 — Initial Implementation & Deployment (2026-03-25)
- ✅ Designed and implemented premium landing page (Blue themed 'Learn More' button).
- ✅ Created `users` table schema in `db/migrations/` and migrated to Neon.
- ✅ Set up FastAPI backend architecture on Render (connected to Neon).
- ✅ Deployed Next.js frontend on Vercel (linked to Render backend).
- ✅ Established CI/CD pipeline via GitHub interlinking.
- **Service URLs:**
  - **Frontend:** [https://tuition-management-system-woad.vercel.app](https://tuition-management-system-woad.vercel.app)
  - **Backend:** [https://tuition-management-system-v05o.onrender.com](https://tuition-management-system-v05o.onrender.com)
- **Decisions:**
  - Used absolute imports for the backend to ensure reliable Render deployments.
  - Configured glassmorphism and blue-vibrant accents for a premium look.

---

## 4. Pending Decisions
- Database schema design (tables, relationships)
- Authentication strategy (JWT, OAuth, etc.)
- API endpoint naming conventions
- UI/UX design direction

---

## 5. Architecture Notes

```
┌─────────────┐     REST API      ┌──────────────┐     SQL       ┌─────────────┐
│   Frontend   │ ───────────────▶  │   Backend    │ ───────────▶  │  Database   │
│  (Next.js)   │                   │  (FastAPI)   │               │ (Neon PG)   │
│   Vercel     │ ◀───────────────  │   Render     │ ◀───────────  │             │
└─────────────┘     JSON           └──────────────┘    Results    └─────────────┘
```
