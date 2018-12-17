FROM node

WORKDIR /app

COPY src /app

RUN npm install

RUN npm install --save-dev serverless

RUN chmod +x /app/entrypoint.sh

ENV HOST 0.0.0.0

EXPOSE 3030

ENTRYPOINT ["/app/entrypoint.sh"]
