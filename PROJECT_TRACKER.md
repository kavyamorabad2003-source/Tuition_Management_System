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
- **Decisions:**
  - Frontend will prioritize plain HTML/CSS over framework-specific styling
  - Three separate deployment targets (Vercel, Render, Neon)
  - Skills will be created per section for reproducible workflows

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
