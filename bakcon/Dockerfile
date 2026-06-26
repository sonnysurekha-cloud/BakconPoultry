FROM node:18-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install --silent
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY bakcon/requirements.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY bakcon/ /app/
COPY --from=frontend-builder /frontend/dist /app/frontend_dist

# Collect static files if configured (won't fail the build if not)
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

CMD ["gunicorn", "bakcon.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
