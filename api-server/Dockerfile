FROM node:12.22.1-alpine3.12
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run tsc

## this is stage two , where the app actually runs

FROM node:12.22.1-alpine3.12
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist ./dist/
CMD ["npm",  "run", "start"]