FROM node:22-alpine

WORKDIR /app

# Build-time env vars for Astro React islands (baked at build time)
ARG PUBLIC_API_URL=http://localhost:3000/api
ARG PUBLIC_BACKEND_URL=http://localhost:3000
ARG PUBLIC_IA_URL=http://localhost:5000
ARG PUBLIC_SITE_URL=http://localhost:4322
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_BACKEND_URL=$PUBLIC_BACKEND_URL
ENV PUBLIC_IA_URL=$PUBLIC_IA_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 4322
ENV HOST=0.0.0.0
ENV PORT=4322

CMD ["node", "dist/server/entry.mjs"]
