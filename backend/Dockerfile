# Dockerfile en la carpeta Backend/Carpeta php
FROM php:8.2

# Instalar dependencias del sistema
RUN apt-get update \
    && apt-get install -y wget unzip git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP necesarias para MySQL
RUN docker-php-ext-install pdo_mysql

# Instalar Composer
RUN wget https://getcomposer.org/installer -O composer-setup.php \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

# Instalar Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Establecer el directorio de trabajo
WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1 

# Copiar los archivos de la aplicación
COPY . /var/www/html

# Instalar dependencias de Symfony y PHP
RUN composer install --no-scripts

# Crear la base de datos
RUN php bin/console doctrine:database:create || true

# Crear el esquema de la base de datos
RUN php bin/console doctrine:schema:create || true

# Iniciar el servidor de desarrollo de Symfony y especificar el directorio 'public'
CMD symfony server:start --no-tls --dir=public --port=80
