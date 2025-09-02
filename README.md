# Ecommerce Toys

## Checklist para mostrar la app a un reclutador

- [x] Instrucciones de instalación y ejecución
- [x] Variables de entorno y configuración
- [x] Credenciales de prueba
- [x] Acceso a funcionalidades principales
- [x] Pruebas automatizadas (si existen)
- [x] Información de puertos y rutas

---

## Instalación y ejecución

1. **Clona el repositorio:**

   ```bash
   git clone eugeniomatiasbrave/EcommerceToys-coderhouse
   cd Ecommerce-Toys
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   - Crea un archivo `.env` basado en `.env.example` (si existe).
   - Configura las claves necesarias (ejemplo: conexión a MongoDB, JWT_SECRET, etc).

4. **Inicia la aplicación:**

   ```bash
   npm run dev
   ```

   La app estará disponible en `http://localhost:8080` (o el puerto configurado).

## Variables de entorno

Asegúrate de definir las siguientes variables en tu archivo `.env`:

- `MONGO_URI=<tu_uri_mongodb>`
- `JWT_SECRET=<tu_clave_secreta>`
- ...otras necesarias

## Credenciales de prueba

- **Usuario admin:**
  - Email:admin@example.com
  - Password: admin
- **Usuario estándar:**
  - Email:  registrarse y loguearse...
  - Password:

## Funcionalidades principales

- Registro y login de usuarios
- Visualización de productos
- Carrito de compras
- Compra y generación de tickets
- Panel de perfil

## Pruebas

Si deseas ejecutar las pruebas automatizadas:

```bash
npm test
```

## Notas adicionales

- Si usas Docker, puedes iniciar la app con:

  ```bash
  docker build -t ecommerce-toys .
  docker run -p 3000:3000 ecommerce-toys
  ```

- Revisa la carpeta `src/public` para archivos estáticos y recursos.
- Para dudas, revisa la documentación en la carpeta `src/docs`.

---

¡Listo para mostrar tu app a cualquier reclutador!
