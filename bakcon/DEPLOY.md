# Docker & Deployment — Bakcon Eggs

This document explains how to build and run the project with Docker and `docker-compose` (simple production/dev setup).

Prerequisites
- Docker and Docker Compose installed on the host machine.

Build and run (one-line)
```bash
docker compose build
docker compose up -d
```

Run management tasks (migrations, createsuperuser, collectstatic)
```bash
# Run migrations
docker compose exec web python manage.py migrate

# Create superuser (follow prompts)
docker compose exec web python manage.py createsuperuser

# Collect static files (frontend static assets are served by nginx)
docker compose exec web python manage.py collectstatic --noinput
```

Environment variables
- `DJANGO_SECRET_KEY` — set a strong secret in production.
- `DJANGO_DEBUG` — set to `False` in production.
- `DJANGO_ALLOWED_HOSTS` — comma-separated hosts (e.g. `example.com,127.0.0.1`).

Notes & Recommendations
- The provided `docker-compose.yml` uses SQLite and a simple volume for static files to keep this setup minimal. For production, switch to Postgres and add `psycopg2-binary` (already listed in `requirements.txt`) and set appropriate `DATABASES` in settings or use `dj-database-url`.
- The backend image uses Gunicorn and WhiteNoise to serve static files. The frontend is built with Vite and served by nginx.
- To deploy on a cloud provider, build images and push to a registry (Docker Hub, GitHub Packages, or your cloud provider) and use their container service (ECS, Cloud Run, App Service, AKS, etc.).

Troubleshooting
- If `collectstatic` fails, ensure `STATIC_ROOT` is set (it is set to `staticfiles` in `bakcon/bakcon/settings.py`).
- If you need Postgres: add a Postgres service in `docker-compose.yml` and update `DATABASES` in settings to read from environment variables. I can add a `docker-compose.prod.yml` with Postgres if you want.
