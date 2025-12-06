# ============================
# 1. Build stage
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# ============================
# 2. Run stage
# ============================
FROM node:18-alpine AS runner

WORKDIR /app

# Copiamos solo los archivos necesarios para producción
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Servidor estático en producción
RUN npm install --omit=dev serve

# Cloud Run escucha en el puerto definido por la variable de entorno $PORT
CMD sh -c "npx serve dist -l 0.0.0.0:$PORT -s"

# Exponemos el puerto, aunque Cloud Run lo sobreescribirá
EXPOSE 8080
