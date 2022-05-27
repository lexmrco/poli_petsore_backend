FROM node:14.15.4

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4 && apt-get install -y gnupg2 && apt-get -y install curl

RUN apt-get install -y ca-certificates wget

# instalar un simple servidor http para servir nuestro contenido estático
RUN npm install -g http-server

# hacer la carpeta 'app' el directorio de trabajo actual
WORKDIR /app

# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./

# instalar dependencias del proyecto
RUN npm install

# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .

# construir aplicación para producción minificada
RUN npm run build

EXPOSE 3000
CMD [ "http-server", "dist" ]