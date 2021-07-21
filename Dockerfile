FROM node:14.6.0-alpine
RUN mkdir /app
WORKDIR /app
COPY .env.dev /app/.env
COPY . /app
RUN npm i
RUN npm run build
CMD ["node", "./build/index.js"]
COPY /src/views /app/build/views
