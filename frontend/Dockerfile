FROM node:12
# RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
# RUN npm i -g npm
# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir -p /prescriptions_app_frontend
WORKDIR /prescriptions_app_frontend

# Installing dependencies
COPY ./package.json /prescriptions_app_frontend/package.json
COPY ./package-lock.json /prescriptions_app_frontend/package-lock.json
RUN npm --unsafe-perm install

# Copying source files
COPY ./ /prescriptions_app_frontend

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]