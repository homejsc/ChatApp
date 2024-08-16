FROM node:latest

WORKDIR /app

COPY . /app

COPY .dockerignore /app/.dockerignore

RUN npm install

RUN npm run build

CMD [ "npm", "run" , "start" ]