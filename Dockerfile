FROM node:lts-alpine

WORKDIR /usr/src/ms

COPY . .

EXPOSE 3000

ENV NODE_ENV='production'
CMD [ "node", "dist/main.js"]