# 🍽️ Backend de Gastronomía - Turismo Comunitario Capachica

Sistema backend completo para la gestión de gastronomía local en Capachica, Puno (Perú). Permite a proveedores y administradores gestionar restaurantes, platos, talleres de cocina y recetas, con autenticación JWT, roles, geolocalización PostGIS y validación Zod.

---

## 🚀 Estado actual

✅ **Listo para frontend** – Todos los endpoints probados y funcionando.

---

## 🔧 Tecnologías utilizadas

| Tecnología               | Propósito                               |
| ------------------------ | --------------------------------------- |
| **Node.js + Express**    | Servidor web                            |
| **TypeORM**              | ORM para PostgreSQL                     |
| **PostgreSQL + PostGIS** | Base de datos espacial                  |
| **Zod**                  | Validación de DTOs                      |
| **JWT**                  | Autenticación (access + refresh tokens) |
| **Multer**               | Subida de archivos (imágenes)           |
| **bcryptjs**             | Hash de contraseñas                     |
| **k6**                   | Pruebas de carga (rendimiento)          |
| **Postman**              | Pruebas funcionales                     |

---

## 🗄️ Base de datos

### Tablas principales

- **`usuarios`** → administradores, proveedores, turistas.
- **`restaurantes`** → establecimientos gastronómicos (con ubicación geoespacial).
- **`platos`** → menú de cada restaurante.
- **`talleres`** → talleres de cocina.
- **`recetas`** → recetas descargables (asociadas a platos).

**Extensión PostGIS:** Soporte para consultas geográficas (cercanía, distancias, radio).

---

## 🔐 Roles y permisos

| Rol           | Permisos                                                       |
| ------------- | -------------------------------------------------------------- |
| **admin**     | Todo (crear, leer, actualizar, eliminar, aprobar restaurantes) |
| **proveedor** | Gestionar su propio restaurante, platos, talleres, recetas     |
| **turista**   | Solo lectura (listar, ver detalles, descargar recetas)         |

**Autenticación:** JWT con refresh token. Los endpoints protegidos requieren el header `Authorization: Bearer <accessToken>`.

---

## 🌐 Endpoints completos

Todos los endpoints usan `http://localhost:3000/api` (o `http://127.0.0.1:3000/api`).  
✅ Funcionan correctamente (validados con Postman y k6).

### 🔐 Autenticación

| Método | Ruta             | Descripción                 | Rol     |
| ------ | ---------------- | --------------------------- | ------- |
| POST   | `/auth/registro` | Registrar proveedor/turista | público |
| POST   | `/auth/login`    | Iniciar sesión              | público |
| POST   | `/auth/refresh`  | Refrescar access token      | público |

**Ejemplo login:**

```json
{
  "email": "kevin@gmail.com",
  "password": "12345678"
}
```

**Respuesta:**

```json
{
  "usuario": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nombre": "Kevin Admin",
    "email": "kevin@gmail.com",
    "rol": "admin"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 👤 Usuarios

| Método | Ruta               | Descripción           | Rol         |
| ------ | ------------------ | --------------------- | ----------- |
| GET    | `/usuarios/perfil` | Obtener perfil propio | autenticado |
| PUT    | `/usuarios/perfil` | Actualizar perfil     | autenticado |

### 🍽️ Restaurantes

| Método | Ruta                        | Descripción                        | Rol              |
| ------ | --------------------------- | ---------------------------------- | ---------------- |
| POST   | `/restaurantes`             | Crear restaurante                  | proveedor, admin |
| GET    | `/restaurantes`             | Listar restaurantes (filtros)      | público          |
| GET    | `/restaurantes/:id`         | Obtener restaurante por ID         | público          |
| PUT    | `/restaurantes/:id`         | Actualizar restaurante             | dueño, admin     |
| DELETE | `/restaurantes/:id`         | Eliminar restaurante (baja lógica) | dueño, admin     |
| POST   | `/restaurantes/:id/aprobar` | Aprobar restaurante                | admin            |

**Filtros en GET /restaurantes:**

```text
?tipo_comida=ancestral&precio_min=10&precio_max=50&latitud=-15.5&longitud=-70.1&radio=5
```

**Ejemplo crear restaurante:**

```json
{
  "nombre": "Restaurante Capachica Gourmet",
  "descripcion": "Sabores auténticos del Lago Titicaca",
  "ubicacion": {
    "latitud": -15.499215,
    "longitud": -70.118738
  },
  "direccion": "Calle del Lago 456, Capachica",
  "whatsapp": "939101632",
  "tipo_comida": "ancestral",
  "especialidades": ["trucha", "papa", "chicha"],
  "precio_promedio": 35,
  "capacidad_mesas": 15
}
```

### 🍝 Platos

| Método | Ruta                                 | Descripción                     | Rol          |
| ------ | ------------------------------------ | ------------------------------- | ------------ |
| POST   | `/platos`                            | Crear plato                     | dueño, admin |
| GET    | `/platos/restaurante/:restauranteId` | Listar platos de un restaurante | público      |
| GET    | `/platos/:id`                        | Obtener plato por ID            | público      |
| PUT    | `/platos/:id`                        | Actualizar plato                | dueño, admin |
| DELETE | `/platos/:id`                        | Eliminar plato                  | dueño, admin |

**Ejemplo crear plato:**

```json
{
  "restaurante_id": "4e4eabd6-2e70-486a-98b0-e68fba687e09",
  "nombre": "Trucha a la parrilla con quinua",
  "descripcion": "Trucha fresca del lago con quinua",
  "precio": 28.5,
  "categoria": "ancestral",
  "ingredientes": ["trucha", "quinua", "papa", "zanahoria", "cebolla"],
  "es_recomendado": true
}
```

### 👨‍🍳 Talleres

| Método | Ruta                                   | Descripción                       | Rol          |
| ------ | -------------------------------------- | --------------------------------- | ------------ |
| POST   | `/talleres`                            | Crear taller                      | dueño, admin |
| GET    | `/talleres/restaurante/:restauranteId` | Listar talleres de un restaurante | público      |
| GET    | `/talleres/:id`                        | Obtener taller por ID             | público      |
| PUT    | `/talleres/:id`                        | Actualizar taller                 | dueño, admin |
| DELETE | `/talleres/:id`                        | Eliminar taller                   | dueño, admin |

**Ejemplo crear taller:**

```json
{
  "restaurante_id": "4e4eabd6-2e70-486a-98b0-e68fba687e09",
  "nombre": "Taller de cocina ancestral",
  "descripcion": "Aprende a preparar platos típicos",
  "duracion": "3h",
  "precio": 50,
  "capacidad_maxima": 10,
  "horarios": ["10:00", "15:00"],
  "plato_principal": "Trucha a la parrilla"
}
```

### 📖 Recetas

| Método | Ruta                      | Descripción                        | Rol          |
| ------ | ------------------------- | ---------------------------------- | ------------ |
| POST   | `/recetas`                | Crear receta (asociada a un plato) | dueño, admin |
| GET    | `/recetas/plato/:platoId` | Obtener receta de un plato         | público      |
| GET    | `/recetas/:id`            | Obtener receta por ID              | público      |
| PUT    | `/recetas/:id`            | Actualizar receta                  | dueño, admin |
| DELETE | `/recetas/:id`            | Eliminar receta                    | dueño, admin |
| GET    | `/recetas/:id/pdf`        | Descargar PDF de receta            | público      |

**Ejemplo crear receta:**

```json
{
  "plato_id": "9390a0cc-ecb3-441b-a855-213842fbc41d",
  "titulo": "Receta de trucha a la parrilla con quinua",
  "descripcion": "Receta familiar",
  "ingredientes_detallados": ["1 trucha (500g)", "200g quinua", "2 papas"],
  "pasos": ["Limpiar la trucha", "Cocinar la quinua"],
  "tiempo_preparacion": "45 min",
  "dificultad": "medio",
  "pdf_url": "[https://ejemplo.com/receta-trucha.pdf](https://ejemplo.com/receta-trucha.pdf)"
}
```

---

## 🧰 Características adicionales

### 🌍 Geolocalización (PostGIS)

- Guardar ubicación como `geometry(Point, 4326)`.
- Consultar por cercanía (radio en km) usando `ST_DWithin`.
- Calcular distancia entre dos puntos.

### 📸 Subida de archivos (Multer)

- Endpoints protegidos aceptan `multipart/form-data` para subir imágenes.
- Límite: 5MB por archivo.
- Formatos permitidos: JPEG, PNG, WebP, GIF.

### ✅ Validación (Zod)

- Todos los DTOs (crear, actualizar, filtros, respuesta) validados con Zod.
- Mensajes de error claros en español.

### 🌐 Internacionalización (i18n)

- Soporte básico: español, inglés, francés.
- Mensajes de error traducidos según el idioma del cliente.

### 🧪 Pruebas de rendimiento (k6)

- 20 usuarios concurrentes durante 2 minutos.
- 1820 peticiones exitosas.
- Tiempo promedio: 1.98ms.
- 100% de éxito.

---

## 🔌 Conectarse al backend

El servidor corre en: `http://localhost:3000` (o `http://127.0.0.1:3000`)

> **🧠 Nota importante:** Si el servidor está apagado, no te podrás conectar. La buena noticia es que si lo enciendes, funciona perfectamente. 😄

**Comando para iniciar:**

```bash
node app.js
```

**Verificar que está corriendo:**

```bash
curl http://localhost:3000/api/restaurantes
```

---

## 📦 ¿Qué puede hacer el frontend con este backend?

✅ Registrar usuarios (proveedores y turistas)
✅ Iniciar sesión y manejar tokens JWT
✅ Crear, listar, ver, actualizar y eliminar restaurantes (según rol)
✅ Crear, listar, ver, actualizar y eliminar platos
✅ Crear, listar, ver, actualizar y eliminar talleres
✅ Crear, listar, ver, actualizar y eliminar recetas
✅ Subir imágenes a restaurantes, platos, talleres, recetas
✅ Buscar restaurantes por tipo de comida, precio y cercanía geográfica
✅ Descargar PDF de recetas
✅ Obtener el perfil del usuario autenticado
✅ Actualizar el perfil del usuario

---

## 🛠️ Instalación y configuración en una PC nueva

### 1. Requisitos previos

Instala los siguientes programas:

- **Node.js** (versión 18 o superior): [https://nodejs.org/](https://nodejs.org/)
- **PostgreSQL con PostGIS:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/) (al instalar, asegúrate de marcar PostGIS en Stack Builder)
- **Git** (opcional, para clonar el repositorio)

### 2. Clonar o descargar el proyecto

```bash
git clone
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=turismo_capachica
JWT_SECRET=tu_secreto_super_seguro
JWT_REFRESH_SECRET=otro_secreto_para_refresh
NODE_ENV=development
```

### 5. Crear la base de datos y activar PostGIS

Abre PowerShell o tu terminal de PostgreSQL:

```bash
psql -U postgres
```

Dentro de `psql`, ejecuta:

```sql
CREATE DATABASE turismo_capachica;
\c turismo_capachica
CREATE EXTENSION IF NOT EXISTS postgis;
\q
```

### 6. Iniciar el servidor

```bash
node app.js
```

Deberías ver:

```text
✅ Conexión a PostgreSQL establecida con PostGIS.
✅ Extensión PostGIS verificada.
📚 Swagger UI disponible en http://localhost:3000/api-docs
🍽️ Servidor de gastronomía corriendo en puerto 3000
```

### 7. Verificar con Postman o Swagger

- **Swagger UI:** `http://localhost:3000/api-docs`
- **Postman:** Importa la colección desde el archivo `postman_collection.json` (si lo tienes) o prueba manualmente.

---

## 📚 Documentación Swagger

El proyecto incluye Swagger UI integrado. Una vez que el servidor esté corriendo, accede a:

```text
http://localhost:3000/api-docs
```

Desde allí puedes probar todos los endpoints de forma interactiva.

---

## 🧪 Pruebas de carga con k6 (opcional)

Si quieres probar el rendimiento, instala k6:

```bash
npm install -g k6
```

Ejecuta el script de prueba:

```bash
k6 run test.js
```

_El script de ejemplo está incluido en la carpeta `Test/`._

---

## 📂 Estructura del proyecto

```text
backend-gastronomia/
├── 📁 config/
│   ├── 📄 autenticacion.js
│   ├── 📄 base-de-datos.js
│   └── 📄 multer.js
├── 📁 controladores/
│   ├── 📁 auth/
│   │   └── 📄 auth.controlador.js
│   ├── 📁 gastronomia/
│   │   ├── 📄 plato.controlador.js
│   │   ├── 📄 receta.controlador.js
│   │   ├── 📄 restaurante.controlador.js
│   │   └── 📄 taller.controlador.js
│   └── 📁 usuarios/
│       └── 📄 usuario.controlador.js
├── 📁 dtos/
│   ├── 📁 auth/
│   │   ├── 📄 login.dto.js
│   │   ├── 📄 registro.dto.js
│   │   └── 📄 respuesta.dto.js
│   ├── 📁 gastronomia/
│   │   ├── 📁 plato/
│   │   │   ├── 📄 actualizar.dto.js
│   │   │   ├── 📄 crear.dto.js
│   │   │   ├── 📄 filtro.dto.js
│   │   │   └── 📄 respuesta.dto.js
│   │   ├── 📁 receta/
│   │   │   ├── 📄 actualizar.dto.js
│   │   │   ├── 📄 crear.dto.js
│   │   │   └── 📄 respuesta.dto.js
│   │   ├── 📁 restaurante/
│   │   │   ├── 📄 actualizar.dto.js
│   │   │   ├── 📄 crear.dto.js
│   │   │   ├── 📄 filtro.dto.js
│   │   │   └── 📄 respuesta.dto.js
│   │   └── 📁 taller/
│   │       ├── 📄 actualizar.dto.js
│   │       ├── 📄 crear.dto.js
│   │       ├── 📄 filtro.dto.js
│   │       └── 📄 respuesta.dto.js
│   └── 📁 usuarios/
│       ├── 📄 actualizar.dto.js
│       └── 📄 perfil.dto.js
├── 📁 middleware/
│   ├── 📄 autenticacion.middleware.js
│   ├── 📄 autorizacion.middleware.js
│   ├── 📄 error-handler.js
│   ├── 📄 subida-archivos.middleware.js
│   └── 📄 validacion.middleware.js
├── 📁 modelos/
│   ├── 📁 auth/
│   │   └── 📄 usuario.modelo.js
│   ├── 📁 gastronomia/
│   │   ├── 📄 plato.modelo.js
│   │   ├── 📄 receta.modelo.js
│   │   ├── 📄 restaurante.modelo.js
│   │   └── 📄 taller.modelo.js
│   └── 📁 usuarios/
│       └── 📄 usuario.modelo.js
├── 📁 node_modules/   📦 (Node)
├── 📁 rutas/
│   ├── 📁 auth/
│   │   └── 📄 auth.rutas.js
│   ├── 📁 gastronomia/
│   │   ├── 📄 plato.rutas.js
│   │   ├── 📄 receta.rutas.js
│   │   ├── 📄 restaurante.rutas.js
│   │   └── 📄 taller.rutas.js
│   └── 📁 usuarios/
│       └── 📄 usuario.rutas.js
├── 📁 servicios/
│   ├── 📁 auth/
│   │   └── 📄 auth.servicio.js
│   ├── 📁 compartidos/
│   │   ├── 📄 correo.servicio.js
│   │   ├── 📄 mapa.servicio.js
│   │   └── 📄 pago.servicio.js
│   ├── 📁 gastronomia/
│   │   ├── 📄 plato.servicio.js
│   │   ├── 📄 receta.servicio.js
│   │   ├── 📄 restaurante.servicio.js
│   │   └── 📄 taller.servicio.js
│   └── 📁 usuarios/
│       └── 📄 usuario.servicio.js
├── 📁 Test/
│   └── 📄 test.js
├── 📁 utilidades/
│   ├── 📄 ayudante-i18n.js
│   ├── 📄 geo-calculadora.js
│   └── 📄 logger.js
├── 📄 app.js
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 swagger.yaml

```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---
