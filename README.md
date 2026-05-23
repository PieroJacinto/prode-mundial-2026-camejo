#  Prode Mundial 2026 CAMEJO

Aplicacion web para predecir resultados del Mundial 2026.
Cada usuario se registra, recibe saldo virtual y puede apostar en cada partido.
Gana quien acumule mas puntos al final del torneo.

---

## Tecnologias

- **Frontend:** HTML / CSS / JavaScript (servido con Nginx)
- **Backend:** Node.js + Express (API REST)
- **Base de datos:** PostgreSQL
- **Infraestructura:** Docker + Docker Compose

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- WSL (Ubuntu) en Windows
- Git

---

## Como levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/PieroJacinto/prode-mundial-2026-camejo.git
cd prode-mundial-2026-camejo
```

### 2. Crear el archivo de variables de entorno

```bash
cp .env.example .env
```

Editar el `.env` con los valores reales (pedirle al equipo).

### 3. Instalar dependencias del backend

> ⚠️ Siempre instalar desde WSL, no desde Git Bash, para que el node_modules sea compatible con Linux.


```bash
cd backend
npm install
cd ..
```

### 4. Primera vez (o cuando se agregan dependencias nuevas)

```bash
docker compose up -d --build
```

### 5. El resto del tiempo

```bash
docker compose up -d
```


El frontend y el backend tienen volumenes sincronizados: cualquier cambio que hagas
en los archivos se refleja automaticamente sin necesidad de reconstruir la imagen.
El backend ademas usa nodemon, que reinicia el servidor solo al detectar cambios.

### 6. Cuando instalas una dependencia nueva

> ⚠️ Siempre desde WSL.

```bash
cd backend
npm install nombre-paquete
cd ..
docker compose up -d --build
```

### 7. Ver los logs en tiempo real

```bash
docker compose logs -f          # todos los servicios
docker compose logs -f backend  # solo el backend
```

### 8. Verificar que todo funciona

Abrir en el navegador:
```bash
http://localhost/pages/usuarios.html
```

O verificar el backend desde la terminal:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{ "status": "ok", "db": "conectada" }
```

### 9. Flujo del dia a dia

```bash
# Al arrancar a trabajar
docker compose up -d

# Al terminar el dia (libera recursos)
docker compose down
```

### 10. Bajar los contenedores

```bash
docker compose down        # conserva los datos de la DB
docker compose down -v     # borra tambien los datos de la DB(usar cuando falla node_modules)
rm -rf .volumes            # resetea la DB completamente (usar con cuidado)
```

## Comandos utiles

```bash
# Ver los logs de todos los contenedores
docker compose logs -f

# Ver los logs de un servicio especifico
docker compose logs -f backend
docker compose logs -f db
docker compose logs -f frontend

# Reconstruir las imagenes (usar cuando se cambia el codigo)
docker compose up -d --build

# Si el build no alcanza y algo sigue fallando, forzar recreacion completa
docker compose up -d --build --force-recreate

# Resetear la DB (cuando se modifica el init.sql)
docker compose down
rm -rf .volumes
docker compose up -d
```

---

## Vistas disponibles

| URL | Descripcion |
|---|---|
| `http://localhost` | Pagina de inicio |
| `http://localhost/pages/login.html` | Iniciar sesion |
| `http://localhost/pages/register.html` | Registrarse |
| `http://localhost/pages/usuarios.html` | Lista de jugadores |

---

## Endpoints de la API

| Metodo | Endpoint | Descripcion | Auth requerida |
|---|---|---|---|
| GET | `/api/health` | Verificar que el servidor funciona | No |
| GET | `/api/usuarios` | Listar todos los usuarios | No |
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/logout` | Logout | Si |
| GET | `/api/auth/me` | Ver usuario de la sesion activa | Si |

## Flujo de trabajo con Git

```bash
# 1. Crear una branch para tu tarea
git checkout -b feature/nombre-tarea

# 2. Hacer cambios y commitear de forma atomica
git add archivo.js
git commit -m "feat: descripcion clara del cambio"

# 3. Subir la branch
git push origin feature/nombre-tarea

# 4. Abrir un Pull Request en GitHub hacia develop
# 5. Esperar revision y aprobacion de otro integrante
# 6. Mergear a develop una vez aprobado
```

