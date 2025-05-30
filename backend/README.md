# Goal Tracker - Backend

Este es el backend para la aplicación Goal Tracker. Está construido con **Node.js**, **Express**, y **MongoDB**. Proporciona una API REST para manejar metas personales.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas con Mongoose
- Middleware personalizado para API Key
- Dotenv

## 🔐 Rutas disponibles

- `POST /addGoal` – Agrega un nuevo Goal.
- `GET /getGoals` – Retorna todas los Goals guardados.
- `DELETE /removeGoal/:id` – Elimina un Goal por su ID.
- `POST /addTask` – Agrega un nuevo Task.
- `GET /getTasks` – Retorna todas los Tasks guardados.
- `DELETE /removeTask/:id` – Elimina un Task por su ID.

Todas las rutas están protegidas con una API Key usando middleware.

## 🛠 Instalación

1. Clona el repositorio:

   ```bash
    git clone https://github.com/KevinCordon/proyecto_final_daw.git
    cd proyecto_final_daw/backend
    run npm install
    run npm start
    server will start in localhost:5000
