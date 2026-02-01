# BOOKSYNC 📚  
Sistema de gestión de bibliotecas (ERP académico)

BOOKSYNC es un proyecto académico desarrollado como parte del programa de **Análisis y Desarrollo de Software**.  
El sistema permite la gestión de libros, inventario y usuarios, incluyendo un panel administrativo con CRUD completo.

---

## 🚀 Tecnologías utilizadas

### Backend
- Node.js
- Express
- MySQL
- Sequelize
- JWT (Autenticación)

### Frontend
- React
- Axios
- CSS
- Radix UI (modales)
- Vite

---

## 📂 Estructura del proyecto

/backend
├── controllers
├── middlewares
├── models
├── routes
├── config
└── index.js

/frontend
├── src
│ ├── components
│ ├── context
│ ├── hooks
│ ├── pages
│ ├── services
│ └── styles
└── main.jsx



---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Node.js (v18 o superior)
- MySQL
- Git

---

## 🛠️ Configuración del Backend

1. Ingresar a la carpeta del backend:
```bash
cd Server
Instalar dependencias:

npm install
Crear un archivo .env con la siguiente estructura:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=BookSync
DB_NAME=booksync

Ejecutar el servidor:

npm run dev
El backend quedará corriendo en:

http://localhost:3000
```

💻 Configuración del Frontend
```bash
Ingresar a la carpeta del frontend:

cd Client
Instalar dependencias:

npm install
Ejecutar la aplicación:

npm run dev
El frontend se abrirá en el navegador, normalmente en:

http://localhost:5173
```
👤 Roles del sistema
Usuario: visualización general

👤Administrador: gestión de inventario (crear, editar, eliminar libros)

El acceso administrativo depende del rol del usuario autenticado.


✅ Funcionalidades principales
-
Autenticación con JWT

CRUD de libros (crear, listar, editar y eliminación lógica)

Panel administrativo

Persistencia de sesión

Diseño modular y escalable

📌 Notas finales
Este proyecto tiene fines académicos y fue desarrollado siguiendo buenas prácticas de desarrollo frontend y backend, separación de responsabilidades y uso de servicios.

