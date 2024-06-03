# Definir la versión de Ubuntu
ARG UBUNTU_VERSION=22.04

# Usar la imagen oficial de Ubuntu
FROM ubuntu:${UBUNTU_VERSION}

# Establecer variables de entorno para Apache
ENV HTTPD_PREFIX /usr/local/apache2
ENV PATH $HTTPD_PREFIX/bin:$PATH

# Crear el directorio de Apache y cambiar su propietario
RUN mkdir -p "$HTTPD_PREFIX" \
    && chown www-data:www-data "$HTTPD_PREFIX"

# Configurar el directorio de trabajo
WORKDIR $HTTPD_PREFIX

# Actualizar e instalar Apache y curl
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    apache2 curl \
    && rm -rf /var/lib/apt/lists/*

# Habilitar los módulos necesarios de Apache
RUN a2enmod proxy_fcgi ssl rewrite proxy proxy_balancer proxy_http proxy_ajp

# Configurar el archivo apache2.conf
RUN sed -i '/Global configuration/a \
ServerName localhost \
' /etc/apache2/apache2.conf

# Establecer variables de entorno para Apache
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data

# Exponer los puertos 80 y 443
EXPOSE 80 443

# Eliminar el archivo PID y deshabilitar el sitio por defecto
RUN rm -f /run/apache2/apache2.pid
RUN rm -f /etc/apache2/sites-enabled/000-default.conf

# Comando por defecto para iniciar Apache
CMD ["apachectl", "-DFOREGROUND", "-e", "info"]

