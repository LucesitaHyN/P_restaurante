FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Dar permisos de ejecución a los scripts dentro del contenedor
RUN chmod +x ./scripts/wait-for-it.sh ./start

EXPOSE 3000

# Ejecutar el script start al iniciar el contenedor
CMD ["./start"]
