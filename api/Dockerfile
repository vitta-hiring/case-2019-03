FROM node:12
# RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python
RUN npm i -g npm
RUN mkdir -p /prescriptions_app_api
WORKDIR /prescriptions_app_api
COPY ./package.json /prescriptions_app_api/package.json
RUN npm --unsafe-perm install
COPY ./ /prescriptions_app_api
RUN npm run build
EXPOSE 3123
CMD [ "npm", "run", "start:prod" ]