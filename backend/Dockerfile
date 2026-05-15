# Usamos una imagen base de Node.js, alpine es version muuy liviana de linux
FROM node:18-alpine
# definimos el directorio de trabajo dentro del contenedor, donde se van a ejecutar los sig comandos
WORKDIR /app
# coppiamos los archiv de dependencias al contenedor, antes q el resto del codigo,
# el * es para copiar tanto package.json como package-lock.json
# esto es importante para aprovechar el cache de docker, ya que las dependencias no cambian tan seguido como el codigo, 
#entonces si copiamos todo el codigo antes de instalar las dependencias, cada vez que hagamos un cambio en el codigo, 
# docker va a tener que volver a instalar todas las dependencias
COPY package*.json ./
# instalamos las dependencias en el contenedor
RUN npm install
# ahora si copiamos el resto del codigo al contenedor, 
COPY . .
# el conteneorr va a escuchar el puerto 3000, puerto donde va a correr el back
EXPOSE 3000
# el comando que se ejecuta cuando arranca el contenedor. es decir va a aejcutar nuestro entry pont al back, app.js
CMD ["node", "src/app.js"]