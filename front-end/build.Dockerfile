FROM node:10.15.0-alpine

RUN apk add --no-cache tzdata
ENV TZ=America/Sao_Paulo

RUN echo "alias ll='ls -alF'" >> /etc/bash.bashrc

RUN mkdir /c

RUN npm i npm@latest -g 
RUN npm i --save vuex vuex-router-sync

WORKDIR /c

USER node

CMD npm i -f && npm i --save && npm audit fix --force && npm run build
