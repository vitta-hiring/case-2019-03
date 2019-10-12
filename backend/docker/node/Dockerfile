FROM node:10.15
WORKDIR "/application"

COPY package.json package.json

# Install selected php extensions auxiliar programs and other stuff
RUN npm install -g @adonisjs/cli
RUN npm install
