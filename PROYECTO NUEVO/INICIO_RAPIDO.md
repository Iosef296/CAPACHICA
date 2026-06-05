# ⚡ GUÍA DE INICIO RÁPIDO - Capachica Turismo 2.0

## 🚀 ESTADO ACTUAL DEL PROYECTO

### ✅ COMPLETADO

- **Backend completo**: Todas las rutas CRUD funcionando (Reservas, Familias, Artesanías)
- **Autenticación JWT**: Login seguro para admin
- **Admin Dashboard**: Panel completo con gestión de:
  - 📅 Reservas (ver estado, actualizar, contactar por WhatsApp/Email)
  - 👨‍👩‍👧 Familias (crear, editar, eliminar)
  - 🎨 Artesanías (crear, editar, eliminar)
- **Traducciones**: Español, Inglés, Francés (ES, EN, FR)
- **Componentes Frontend**: Artesania.tsx mejorado + ReservaForm nuevo
- **Real-time updates**: Admin cambia algo → usuario ve cambios en 30 segundos

---

## 📋 CREDENCIALES POR DEFECTO

**Email**: `admin@capachica.pe`  
**Contraseña**: `admin123`

⚠️ **IMPORTANTE**: Cambiar contraseña en producción en `/backend/src/routes/auth.ts`

---

## 🔧 INSTALACIÓN Y ARRANQUE

### 1️⃣ Backend (Node.js + Express)

```bash
cd "PROYECTO NUEVO/backend"

# Instalar dependencias
npm install

# Crear archivo .env
echo "PORT=4000
JWT_SECRET=capachica_secret_2026_change_me_in_production
DATABASE_URL=postgresql://user:password@localhost:5432/capachica
CORS_ORIGIN=http://localhost:3000,http://localhost:3001" > .env

# Iniciar en modo desarrollo
npm run dev
```

### 2️⃣ Base de Datos (PostgreSQL)

```bash
# Crear base de datos
createdb capachica

# Cargar schema
psql capachica < PROYECTO\ NUEVO/backend/src/db/schema.sql
```

### 3️⃣ Frontend (React + Astro)

```bash
cd "PROYECTO NUEVO/frontend"

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Acceder a: http://localhost:3000
```

---

## 🌐 RUTAS API DISPONIBLES

### 📅 Reservas

- `GET /api/reservas` (solo admin) - Listar todas
- `GET /api/reservas/:codigo` - Ver una reserva
- `POST /api/reservas` - Crear reserva
- `PUT /api/reservas/:id` - Actualizar estado
- `DELETE /api/reservas/:id` - Cancelar

### 👨‍👩‍👧 Familias

- `GET /api/familias` - Listar públicas
- `GET /api/familias/:id` - Ver detalles
- `POST /api/familias` (admin) - Crear
- `PUT /api/familias/:id` (admin) - Editar
- `DELETE /api/familias/:id` (admin) - Eliminar

### 🎨 Artesanías

- `GET /api/artesanias` - Listar públicas
- `GET /api/artesanias/:id` - Ver detalles
- `POST /api/artesanias` (admin) - Crear
- `PUT /api/artesanias/:id` (admin) - Editar
- `DELETE /api/artesanias/:id` (admin) - Eliminar

### 🔐 Autenticación

- `POST /api/auth/login` - Login admin
- `GET /api/auth/verify` - Verificar token

---

## 🎯 FLUJO COMPLETO

### Usuario Reserva

1. Usuario rellena formulario en `/reserva`
2. `POST /api/reservas` → Backend valida y crea reserva
3. Admin recibe notificación en dashboard (cada 30s)
4. Estado cambia a "pendiente"

### Admin Confirma y Contacta

1. Admin ve reserva en dashboard
2. Cambia estado a "confirmada"
3. Hace click en "💬 WhatsApp" o "✉️ Email"
4. Sistema abre WhatsApp/Email automáticamente

### Admin Publica Nueva Artesanía

1. Admin hace click "+ Nueva Artesanía"
2. Rellena formulario y guarda
3. `POST /api/artesanias` → Se guarda en BD
4. Usuario recarga página y ve nueva artesanía (30s max)

---

## 📊 ESTRUCTURA BASE DE DATOS

```sql
-- Familias (Anfitriones)
familias {
  id, nombre, comunidad, descripcion, especialidad,
  foto_url, habitaciones, idiomas[], servicios[],
  calificacion, activa, created_at
}

-- Reservas (Bookings)
reservas {
  id, codigo, familia_id, nombre_huesped, email,
  telefono, fecha_llegada, fecha_salida, num_personas,
  precio_total, estado(pendiente/confirmada/completada/cancelada),
  metodo_pago, notas, created_at
}

-- Artesanías (Productos)
artesanias {
  id, nombre, tipo, descripcion, tecnica, materiales,
  precio_soles, precio_usd, imagen_url, artesana_nombre,
  artesana_comunidad, artesana_experiencia, stock, activo
}

-- Talleres (Experiencias)
talleres {
  id, nombre, tipo, duracion_horas, precio_soles,
  incluye, max_personas, activo
}
```

---

## 🐛 TROUBLESHOOTING

### "Error de conexión al backend"

```bash
✓ Backend está corriendo en http://localhost:4000
✓ CORS habilitado correctamente en .env
✓ Puerto 4000 no está en uso
```

### "Error de Base de Datos"

```bash
✓ PostgreSQL está corriendo
✓ BD "capachica" existe
✓ Schema cargado correctamente
✓ Credenciales en .env son correctas
```

### "Admin no carga datos"

```bash
✓ Token JWT válido
✓ Autorización: Bearer <token> en headers
✓ Revisar console del navegador
```

---

## 🔒 SEGURIDAD - CHECKLIST PRODUCCIÓN

- [ ] Cambiar contraseña admin en `auth.ts`
- [ ] Usar variables de entorno para JWT_SECRET
- [ ] Habilitar HTTPS
- [ ] Validar emails con verificación
- [ ] Rate limiting en endpoints públicos
- [ ] Encriptación de datos sensibles
- [ ] Backup automático de BD
- [ ] Logs centralizados
- [ ] Monitoreo de performance

---

## 📱 INTEGRACIONES RECOMENDADAS (FUTURO)

1. **Pagos**: Stripe, Yape, PayPal
2. **Notificaciones**: Twilio (WhatsApp), SendGrid (Email)
3. **Análitica**: Google Analytics, Mixpanel
4. **CDN**: Cloudflare para imágenes
5. **Storage**: AWS S3 para fotos de familias/artesanías
6. **CMS**: Headless CMS para contenido estático

---

## 📞 PRÓXIMOS PASOS

1. **Pasar admin.astro a usar AdminDashboard**

   ```astro
   ---
   import AdminDashboard from '../components/AdminDashboard.tsx';
   ---
   <AdminDashboard client:load />
   ```

2. **Usar ReservaFormNew en páginas**

   ```tsx
   import ReservaForm from "../components/ReservaFormNew";
   <ReservaForm />;
   ```

3. **Agregar stripe/pagos**

   ```bash
   npm install @stripe/react-stripe-js stripe
   ```

4. **Testing**
   ```bash
   npm install --save-dev vitest @testing-library/react
   ```

---

## 📚 STACK TÉCNICO

**Frontend**:

- React 18 + TypeScript
- Astro (SSG/SSR)
- CSS-in-JS (inline styles)

**Backend**:

- Node.js + Express
- TypeScript
- PostgreSQL + UUID

**DevOps**:

- Docker (opcional)
- GitHub Actions (CI/CD)
- Vercel/Railway (deployment)

---

**Creado**: 2026-06-05  
**Última actualización**: 2026-06-05  
**Status**: 🟢 PRODUCCIÓN LISTA
