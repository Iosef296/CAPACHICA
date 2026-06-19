FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 4322
ENV HOST=0.0.0.0
ENV PORT=4322

CMD ["node", "dist/server/entry.mjs"]
