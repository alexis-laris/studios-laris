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

ENV PORT=8080

# Cloud Run siempre expone 8080
CMD ["npx", "serve", "dist", "-l", "8080", "-s"]
