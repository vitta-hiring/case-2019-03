## The instructions for the first stage
FROM node:10-alpine as builder_backend

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm install

# The instructions for second stage
FROM node:10-alpine

WORKDIR /application
COPY --from=builder_backend node_modules node_modules

COPY . .

RUN npm install -g @adonisjs/cli
RUN adonis install @adonisjs/vow
