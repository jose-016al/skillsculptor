# Usa una imagen base con PHP y Apache
FROM php:8.2-apache

# Instala extensiones necesarias (modifica según tu proyecto)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copia el código PHP al contenedor
COPY . /var/www/html/

# Establece los permisos adecuados
RUN chown -R www-data:www-data /var/www/html

# Habilita mod_rewrite para Apache
RUN a2enmod rewrite
