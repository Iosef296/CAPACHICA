FROM node:22-alpine AS fe-builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY frontend/package.json ./frontend/
RUN pnpm install --filter frontend
COPY frontend/ ./frontend/
RUN pnpm --filter frontend build

FROM node:22-alpine AS runner
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY backend/package.json ./backend/
RUN pnpm install --filter backend --prod
COPY backend/ ./backend/
COPY --from=fe-builder /app/frontend/dist ./frontend/dist

EXPOSE 3002
ENV NODE_ENV=production
CMD ["pnpm", "--filter", "backend", "start"]