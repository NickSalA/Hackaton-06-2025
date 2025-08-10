# AI Teacher

Plataforma interactiva de aprendizaje impulsada por IA, con chat, lecciones, panel informativo y seguimiento de progreso.

## Características principales

- **Chatbot personalizado por lección:** Cada lección inicia con un mensaje de bienvenida configurable desde la base de datos.
- **Historial de chat persistente:** Guarda los últimos mensajes de cada lección y permite resetear el chat.
- **Panel lateral informativo:** Muestra información en formato Markdown para cada lección.
- **Progreso y racha diaria:** Seguimiento de avance y racha de días de estudio.
- **Lecciones desbloqueables:** El usuario avanza secuencialmente.
- **Autenticación segura:** Login con NextAuth y almacenamiento de sesiones en la base de datos.
- **Backend Python (Flask):** Para lógica avanzada de chat y memoria.
- **Frontend moderno:** Next.js, React, TailwindCSS, React Markdown.

## Estructura del proyecto

```
backend/                # Backend Flask para lógica de IA y memoria
frontend/               # Frontend Next.js + API REST
	app/                  # Componentes, páginas y rutas API
	prisma/               # Esquema y seed de la base de datos
	public/               # Archivos estáticos (logo, favicon, etc)
	...
```

## Instalación y uso

### 1. Clona el repositorio

```bash
git clone https://github.com/NickSalA/Hackaton-06-2025.git
cd Hackaton-06-2025
```

### 2. Configura el backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Configura el frontend

```bash
cd frontend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 4. Variables de entorno

Crea un archivo `.env` en `frontend/` con tus credenciales de base de datos y autenticación.

### 5. Seed de lecciones

Edita `frontend/prisma/seed-lessons.js` para personalizar ids, títulos, mensajes de bienvenida y paneles informativos.

## Modelos principales (Prisma)

- **User, Account, Session:** Autenticación y usuarios.
- **Course, Lesson:** Cursos y lecciones, con campos `infoPanel` y `chatWelcomeMessage`.
- **ChatSession, Message:** Persistencia de chats por lección.
- **Progress:** Seguimiento de avance y racha.
- **AccessLog:** Registro de accesos.

## Personalización

- Cambia el logo en `frontend/public/ai_teacher_logo.png`.
- El título global se define en `frontend/app/layout.tsx`.
- El favicon se configura en el mismo archivo con `<link rel="icon" ... />`.

## Tecnologías

- Next.js 15, React 19, TailwindCSS 4, Prisma 6, NextAuth, React Markdown, Flask (Python).
