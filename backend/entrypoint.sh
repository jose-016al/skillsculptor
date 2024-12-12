#!/bin/bash
# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté disponible..."
until mysql -h db -u root -proot -e 'show databases;' > /dev/null 2>&1; do
  sleep 2
done

# Ejecutar la creación de esquema de Doctrine
echo "Creando las tablas en la base de datos..."
php bin/console doctrine:schema:create

# Iniciar el servidor Symfony
symfony server:start --allow-all-ip --no-tls --port=80 --dir=/var/www/html