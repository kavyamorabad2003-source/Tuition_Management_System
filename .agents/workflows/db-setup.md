---
description: How to set up and manage the Neon PostgreSQL database for the Tuition Management System
---

# Database Setup Skill (Neon PostgreSQL)

## Prerequisites
- A Neon account at https://neon.tech
- Connection string from Neon dashboard

## Steps

### 1. Create a Neon Project
1. Go to https://console.neon.tech
2. Click **New Project**
3. Name it `tuition-management-system`
4. Select the nearest region
5. Copy the connection string (format: `postgresql://user:pass@host/dbname?sslmode=require`)

### 2. Local Development
1. Store the connection string in a `.env` file (never commit this):
   ```
   DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
   ```
2. All schema files go in `db/schema/`
3. All migration files go in `db/migrations/`
4. Seed data scripts go in `db/seeds/`

### 3. File Naming Conventions
- Schema: `db/schema/001_initial_schema.sql`
- Migrations: `db/migrations/001_create_tables.sql`
- Seeds: `db/seeds/001_sample_data.sql`

### 4. Running Migrations
```bash
# Using psql with Neon connection string
psql $DATABASE_URL -f db/migrations/001_create_tables.sql
```

### 5. Best Practices
- Always use parameterized queries to prevent SQL injection
- Use `IF NOT EXISTS` in CREATE statements
- Add comments to complex queries
- Keep migrations small and incremental
