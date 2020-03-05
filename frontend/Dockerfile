FROM node:10-alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock /usr/app/

RUN yarn
COPY . /usr/app

EXPOSE 3000

CMD ["yarn","start"]
