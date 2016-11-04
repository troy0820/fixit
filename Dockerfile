FROM node:latest


ADD package.json /tmp/package.json

RUN cd /tmp/ && npm install --production

RUN mkdir -p /var/www && cp -a /tmp/node_modules /var/www

WORKDIR /var/www

ADD . /var/www

EXPOSE 3000

ENTRYPOINT  ["npm", "start"]
