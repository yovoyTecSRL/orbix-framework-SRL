# Tutorium Academy MVP

## Pasos rápidos

1. Clona el repo
2. Copia `.env.example` a `.env` y ajusta si es necesario
3. Ejecuta:
   docker-compose up --build
4. Accede a:
   - Frontend: http://localhost:8080
   - Backend: http://localhost:8000/docs

## Pruebas rápidas

Usa curl o Postman para probar endpoints:

curl http://localhost:8000/health
curl http://localhost:8000/stats
curl http://localhost:8000/students
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d '{"message":"Hola IA"}'
curl http://localhost:8000/live/whiteboard/events

## Estructura

- backend/: FastAPI + SQLite
- frontend/: HTML/JS + Aula en Vivo
- docker-compose.yml: Orquestación

## Roadmap

- Integrar OdooAdapter real
- Mejorar streaming y IA
