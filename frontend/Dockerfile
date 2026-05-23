# usamos la imagen oficial de Nginx, basada en alpine q es linux muy liviano
# Nginx es un servidor web que nos sirve para enviar los html, css y js del frontend al navegador del usuario(archivos estaticos)
FROM nginx:alpine
# copiamos todo el contenido de la carpeta frontend al directorio de nginx donde se sirven los archivos estaticos
COPY . /usr/share/nginx/html
# el contenedor escucha el puerto http estandar 80, como definimos en el compose.  
EXPOSE 80