FROM --platform=linux/amd64 node:20.9 as build

RUN mkdir -p /usr/local/bin/app

WORKDIR /usr/local/bin/app

COPY . .

RUN npm install

RUN npm run ssr:build

EXPOSE 8888

CMD ["npm", "run", "ssr:run"]