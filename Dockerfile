# ── Stage 1: install all deps (including dev) for build ───────────────────────
FROM node:20-alpine AS dev-deps
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci

# ── Stage 2: install production deps only ────────────────────────────────────
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci --omit=dev

# ── Stage 3: build the React Router client ───────────────────────────────────
FROM dev-deps AS build
COPY client/ ./client/
RUN npm run build --workspace=client

# ── Stage 4: production image ─────────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/client/build ./client/build
COPY server/ ./server/

# Expose both ports (client SSR: 3000, API server: 3001)
EXPOSE 3000 3001

# Start both: the React Router server and the Express API
CMD ["npm", "run", "start"]
