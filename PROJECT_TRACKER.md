# 📘 Tuition Management System — Project Document

> **Last Updated:** 2026-03-23

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

### Step 2 — Initial Implementation (2026-03-24)
- ✅ Designed and implemented premium landing page with Sign In / Sign Up buttons.
- ✅ Created `users` table schema in `db/migrations/`.
- ✅ Set up FastAPI backend architecture with SQLAlchemy models and Pydantic schemas.
- ✅ Prepared `render.yaml` for backend deployment.
- **Decisions:**
  - Used Inter font and a sleek dark mode for the frontend.
  - Backend follows a modular architecture (models, schemas, routers).

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
