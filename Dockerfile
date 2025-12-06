# ============================
# 1. Build stage
# ============================
FROM node:22.12.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --force

COPY . .
RUN npm run build

# ============================
# 2. Run stage
# ============================
FROM nginx:alpine

# Copiamos la carpeta generada por Astro
COPY --from=build /app/dist /usr/share/nginx/html

# Configuramos Nginx para escuchar el puerto de Cloud Run
RUN sed -i "s/listen       80;/listen       ${PORT:-8080};/" /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
