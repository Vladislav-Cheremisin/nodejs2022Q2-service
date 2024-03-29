FROM node:16.16-alpine3.16
WORKDIR /usr/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]