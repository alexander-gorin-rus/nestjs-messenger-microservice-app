FROM node:20-alpine3.17 as install

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .
