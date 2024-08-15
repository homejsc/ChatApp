FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

COPY .dockerignore /app/.dockerignore

CMD ["npm","run","start"]
