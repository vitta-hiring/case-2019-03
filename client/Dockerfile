FROM node:9.11.1-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm cache verify && npm cache clean -f

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist", "-a" "0.0.0.0"]
