# SkillsCulptor

Este proyecto utiliza Docker para la gestión de entornos. Después de crear el proyecto, se realizó una modificación en el archivo vite.config.js para especificar el host y el puerto que se utilizarán en el entorno Docker

# Construir el contenedor Docker
Ejecuta este comando para crear la imagen en tu máquina local e iniciar el contenedor.   Solo necesitas ejecutar este comando la primera vez y cada vez que realices cambios en el archivo docker-compose.yml
```bash
docker-compose up --build --no-recreate -d
```
A partir de la segunda vez podemos utilizar
```bash
docker-compose up -d
```
Ahora nuestro contenedor está activo y debería poder probarlo usando el siguiente comando
```bash
docker-compose ps
```