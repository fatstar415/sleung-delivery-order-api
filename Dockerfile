FROM node:8.16.0-jessie-slim

WORKDIR /app
COPY . /app

RUN ./start.sh delivery root rootpass

RUN npm i

EXPOSE 8080

ENV APP_PORT 8080
ENV DB_HOST 127.0.0.1
ENV DB_USER root
ENV DB_PASS rootpass
ENV DB_NAME delivery
ENV MAX_UPLOAD_SIZE 1048576
ENV GOOGLE_API_KEY AIzaSyAtYsSCoET8Y2rk9w3_yDMqw4j5JUBYZbw

CMD ["node", "app.js"]