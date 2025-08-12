# Etapa 1: Build con Node.js
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build Angular
COPY --from=builder /app/dist/restaurante-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
