#!/bin/bash
# Esperar a que la base de datos esté disponible usando nc
echo "Esperando a que MySQL esté disponible..."
until nc -z -v -w30 db 3306; do 
  echo "Esperando a que MySQL esté disponible..."
  sleep 5
done

# Ejecutar la actualización de esquema de Doctrine
echo "Creando las tablas en la base de datos..."
php bin/console doctrine:schema:update --force

# Iniciar PHP-FPM como proceso principal
echo "Iniciando PHP-FPM..."
php-fpm
