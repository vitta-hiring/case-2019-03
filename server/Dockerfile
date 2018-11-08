FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm cache verify && npm cache clean -f

COPY . .

EXPOSE 3000
CMD [ "node", "./bin/server.js" ]
