# Todo API (Django + DRF + JWT)

## Features
- JWT Auth (register/login/refresh)
- Tasks CRUD scoped to the logged-in user

## Run
cd backend\todo_api
venv\Scripts\activate
python manage.py migrate
python manage.py runserver

## API
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
GET/POST /api/tasks/
PATCH/DELETE /api/tasks/:id/
Authorization: Bearer <access token>
