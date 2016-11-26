FROM node:7.1

COPY package.json /tmp/package.json

RUN cd /tmp/ && npm install --production

RUN mkdir -p /var/www && cp -a /tmp/node_modules /var/www

WORKDIR /var/www

COPY . /var/www

EXPOSE 3000

VOLUME /var/www 

ENTRYPOINT  ["npm", "start"]
