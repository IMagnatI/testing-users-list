FROM node:16.15.1-alpine3.15 AS build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm cache clean -f
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
