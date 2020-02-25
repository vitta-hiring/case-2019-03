FROM node:12.10.0-alpine
RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
RUN npm i -g npm
WORKDIR /safe_prescriptions/api
COPY ./api/package.json /safe_prescriptions/api/package.json
RUN npm --unsafe-perm install
COPY ./api /safe_prescriptions/api
RUN npm run build
EXPOSE 3123
# CMD [ "npm", "run", "start:prod" ]