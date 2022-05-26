FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD [ "node", "app.js" ]