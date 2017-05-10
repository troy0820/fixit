FROM mhart/alpine-node:latest

COPY package.json /tmp/package.json

RUN cd /tmp/ && npm install --production

RUN apk update && apk add curl

RUN mkdir -p /var/www && cp -a /tmp/node_modules /var/www

WORKDIR /var/www

COPY . /var/www

EXPOSE 3000

VOLUME /var/www 

HEALTHCHECK --interval=5s --timeout=3s --retries=5 CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT  ["npm", "start"]
