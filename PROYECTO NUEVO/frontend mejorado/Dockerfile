FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 4322
ENV HOST=0.0.0.0
ENV PORT=4322

CMD ["node", "dist/server/entry.mjs"]
