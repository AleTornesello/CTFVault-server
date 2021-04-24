FROM node:12.22.1-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "node", "src/app.js" ]