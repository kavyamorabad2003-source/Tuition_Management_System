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
- ✅ Implemented Signup and Signin authentication flows using `bcrypt` and `python-jose` (JWT).
- ✅ Created protected frontend routes including a User Dashboard `\dashboard`.
- **Service URLs:**
  - **Frontend:** [https://tuition-management-system-woad.vercel.app](https://tuition-management-system-woad.vercel.app)
  - **Backend:** [https://tuition-management-system-v05o.onrender.com](https://tuition-management-system-v05o.onrender.com)
- **Decisions:**
  - Used absolute imports for the backend to ensure reliable Render deployments.
  - Configured glassmorphism and blue-vibrant accents for a premium look.

---

## 4. Pending Decisions
- Implementation of further Dashboard features (Charts, Payments, Scheduling).
- Expanded RBAC (Role-Based Access Control) for Student vs Tutor interfaces.

---

## 5. Architecture Notes

```
┌─────────────┐     REST API      ┌──────────────┐     SQL       ┌─────────────┐
│   Frontend   │ ──(JSON/JWT)───▶  │   Backend    │ ───────────▶  │  Database   │
│  (Next.js)   │                   │  (FastAPI)   │               │ (Neon PG)   │
│   Vercel     │ ◀───────────────  │   Render     │ ◀───────────  │             │
└─────────────┘     Results        └──────────────┘    Data       └─────────────┘
```

## 6. Key Learnings & Resolutions
- **Bcrypt Compatibility**: The newest version of `bcrypt` is incompatible with `passlib` due to the removal of the `__about__` attribute. We explicitly pinned `bcrypt==3.2.2` in `requirements.txt` to prevent 500 Internal Server Errors during password hashing.
- **Frontend Vercel Environment Variables**: To guarantee immediate API linkage and bypass Vercel env variable propagation delays, we temporarily hardcoded the live Render API URL into the frontend `fetch` calls.
- **Client-Side Auth State**: Extracted and parsed the JWT token into `localStorage` during sign-in to instantly validate route protection for the `/dashboard`.
