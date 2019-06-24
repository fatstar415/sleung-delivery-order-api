FROM node:8.16.0-jessie-slim

WORKDIR /app
COPY . /app

RUN npm i

CMD ["node", "app.js"]