FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY next.config.js ./next.config.js

COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY components ./components
COPY utils ./utils

CMD ["yarn", "dev"]