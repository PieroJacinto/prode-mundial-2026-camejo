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

El backend usa nodemon: cada vez que guardes un archivo,
el servidor se reinicia solo sin necesidad de reconstruir la imagen.

### 6. Ver los logs en tiempo real

```bash
docker compose logs -f          # todos los servicios
docker compose logs -f backend  # solo el backend
```

### 7. Verificar que todo funciona

Abrir en el navegador o correr en la terminal:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{ "status": "ok", "db": "conectada" }
```

### 8. Bajar los contenedores

```bash
docker compose down        # conserva los datos de la DB
docker compose down -v     # borra tambien los datos de la DB
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
```

---

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

