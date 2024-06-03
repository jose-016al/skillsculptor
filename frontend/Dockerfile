# Dockerfile para React
FROM node:20

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json .
COPY package-lock.json .

# Instalar las dependencias de React
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000 para la aplicación React
EXPOSE 3000

# Iniciar la aplicación React en modo desarrollo
CMD ["npm", "run", "dev"]
