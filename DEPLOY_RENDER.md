Render deployment checklist for Bakcon Poultry

This document describes steps to recreate the backend as a Docker service on Render, provision Postgres, set environment variables, and deploy the frontend.

1) Delete existing Python service (if present)
- In Render dashboard, find the current `bakcon-backend` service and delete it to avoid the incorrect Python build.

2) Create backend web service (Docker)
- Render → New → Web Service
- Name: `bakcon-backend`
- Environment: Docker
- Repo: https://github.com/codex10800-pixel/BakconPoultry
- Branch: `main`
- Dockerfile Path: `Dockerfile` (root)
- Start command: leave blank (Dockerfile defines CMD)
- Advanced: set plan (Free/Starter as desired)

3) Create frontend web service (Docker) — if not already
- Render → New → Web Service
- Name: `bakcon-frontend`
- Environment: Docker
- Dockerfile Path: `frontend/Dockerfile`
- Branch: `main`
- Set `API_BASE_URL` later after backend is live

4) Provision Managed Postgres
- Render → Databases → New Database
- Choose plan, name (e.g. `bakcon-db`)
- After creation, copy the `DATABASE_URL` connection string

5) Set Backend environment variables (Render dashboard → Service → Environment)
- `DATABASE_URL` = (value from the Postgres service)
- `DJANGO_SECRET_KEY` = (use your generated secret — don't commit)
- `DJANGO_DEBUG` = `false`
- `DJANGO_ALLOWED_HOSTS` = `bakcon-backend.onrender.com,localhost` (replace hostname with the Render service URL)

6) Confirm `release_command` (already in `render.yaml`)
- We added: `python manage.py migrate && python manage.py collectstatic --noinput`
- Render will run this automatically on each deploy; you can also run migrations manually from Shell if needed.

7) Manual deploy and watch logs
- In the backend service page, choose "Manual Deploy" → Deploy Latest Commit.
- Watch build logs for errors; common issues:
  - Missing `DATABASE_URL`: add it in env variables
  - Dependencies failing: check `bakcon/requirements.txt`

8) After backend is deployed
- Set `API_BASE_URL` in `bakcon-frontend` env to `https://<bakcon-backend>.onrender.com`
- Deploy frontend service

Useful commands (local or Render Shell):

Run migrations locally:
```bash
python bakcon/manage.py migrate
```

Create superuser:
```bash
python bakcon/manage.py createsuperuser
```

Collect static:
```bash
python bakcon/manage.py collectstatic --noinput
```

9) Security and notes
- Never commit secrets to Git. Use the Render dashboard to store secrets.
- `render.yaml` exists and includes `release_command` and env var placeholders. You can import `render.yaml` when creating services to auto-configure them.

---
If you want, I can:
- Recreate the backend service using Render's API (requires your Render API key), or
- Walk through the Render UI step-by-step and watch the deploy logs with you.
