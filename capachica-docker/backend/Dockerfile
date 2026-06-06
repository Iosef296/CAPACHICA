FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY src/server.js ./src/server.js
COPY src/db.js ./src/db.js
COPY src/routes/reservas.js ./src/routes/reservas.js
COPY src/routes/actividades.js ./src/routes/actividades.js
COPY src/routes/admin.js ./src/routes/admin.js
EXPOSE 3001
CMD ["node", "src/server.js"]