FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    && docker-php-ext-install \
    intl \
    pdo_mysql \
    zip

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Instalar Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Copiar los archivos del proyecto Symfony al contenedor
COPY . /var/www/html

# Instalar las dependencias del proyecto Symfony
RUN composer install 

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio del contenedor
# CMD ["php-fpm"]
CMD ["symfony", "server:start", "--allow-all-ip", "--no-tls", "--port=80", "--dir=/var/www/html"]
