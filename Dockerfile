FROM node:24-bookworm-slim

RUN apt-get update && apt-get install -y \
    openssl \
    procps \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000