FROM ubuntu:latest

# Instalar dependencias del sistema, Apache, PHP, MariaDB, curl, Node.js y Composer
RUN apt-get update && apt-get install -y \
    apache2 \
    nodejs \
    npm \
    mariadb-server \
    php8.2 \
    php8.2-mysql \
    php8.2-cli \
    php8.2-curl \
    php8.2-xml \
    php8.2-mbstring \
    libapache2-mod-php8.2 \
    curl \
    sudo \
    unzip \
    git \
    build-essential \
    libssl-dev \
    ca-certificates \
    gnupg \
    lsb-release

# Configurar Apache
RUN a2enmod rewrite

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar el gestor de versiones de Node.js 'n' y actualizar a la última versión
RUN npm install -g n && \
    n latest

# Verificar que node, npm y composer están instalados
RUN node -v && npm -v && composer --version

# Copiar el proyecto Symfony al contenedor
WORKDIR /var/www/symfony
COPY ./backend ./backend

# Instalar dependencias de Symfony con Composer
RUN cd ./backend && composer install --no-dev --optimize-autoloader

# Configurar Symfony (por ejemplo, generar las claves del .env y preparar la caché)
RUN cd ./backend && php bin/console cache:clear --env=prod && \
    php bin/console cache:warmup --env=prod

# Configurar permisos para Symfony
RUN chown -R www-data:www-data /var/www/symfony

# Copiar el proyecto Vite al contenedor
WORKDIR /var/www/vite
COPY ./frontend ./frontend

# Construir el proyecto Vite
RUN cd ./frontend && npm install && npm run build && \
    cp -r ./dist/* /var/www/html/

# Configurar permisos para Apache
RUN chown -R www-data:www-data /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Comando predeterminado
CMD ["apache2ctl", "-D", "FOREGROUND"]
