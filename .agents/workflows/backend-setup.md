---
description: How to set up and develop the FastAPI backend for the Tuition Management System (deployed on Render)
---

# Backend Setup Skill (FastAPI + Render)

## Prerequisites
- Python 3.10+
- pip / venv

## Steps

### 1. Initialize the Backend
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
pip freeze > requirements.txt
```

### 2. Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app entry point
│   ├── config.py         # Settings & env vars
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── routers/          # API route modules
│   ├── services/         # Business logic
│   └── utils/            # Helpers & utilities
├── requirements.txt
├── .env                  # Local env vars (not committed)
├── .env.example          # Template for env vars
├── render.yaml           # Render deployment config
└── README.md
```

### 3. Running Locally
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```
API docs available at `http://localhost:8000/docs`

### 4. Render Deployment Config
Create `render.yaml` in `backend/`:
```yaml
services:
  - type: web
    name: tuition-management-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        sync: false
```

### 5. Best Practices
- Use Pydantic models for request/response validation
- Organize routes by resource (students, tutors, payments, etc.)
- Use dependency injection for DB sessions
- Add CORS middleware for frontend communication
- Use environment variables for all secrets
