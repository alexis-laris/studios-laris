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

# Opcional: si quieres customizar Nginx, agrega tu nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
