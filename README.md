# GestorPro

Aplicación web CRUD de productos desarrollada con el stack MEAN (MongoDB, Express, Angular, Node.js) como actividad académica de Desarrollo de Software Web.

## Funcionalidades
- Registrar productos (Create)
- Listar productos y ver el total en existencias (Read)
- Editar productos (Update)
- Eliminar productos con confirmación (Delete)

Cada producto tiene: nombre, categoría, precio y existencias.

## Tecnologías
- **Frontend:** Angular 21 y Tailwind CSS
- **Backend:** Node.js y Express
- **Base de datos:** MongoDB Atlas con Mongoose
- **Control de versiones:** Git y GitHub

## Estructura
```
GESTOPRO
├── backend    API REST (Express + Mongoose)
└── frontend   Aplicación Angular
```

## Cómo ejecutarlo

### Requisitos
Node.js, npm y una base de datos en MongoDB Atlas.

### Backend
```
cd backend
npm install
```
Crea un archivo `.env` dentro de `backend` con:
```
MONGO_URI=tu_cadena_de_conexion_de_atlas
PORT=3000
```
Luego ejecuta:
```
npm run dev
```
La API queda en `http://localhost:3000/api/productos`.

### Frontend
```
cd frontend
npm install --legacy-peer-deps
ng serve -o
```
La aplicación se abre en `http://localhost:4200`.

## API
| Método | Ruta | Acción |
|---|---|---|
| POST | /api/productos | Crear producto |
| GET | /api/productos | Listar productos |
| GET | /api/productos/:id | Obtener un producto |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |

## Autor
Isaias Salinas, Universidad de Cartagena.