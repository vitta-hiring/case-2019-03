FROM node

WORKDIR /srv

COPY src /srv

RUN npm install

RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0

ENTRYPOINT ["/srv/entrypoint.sh"]
