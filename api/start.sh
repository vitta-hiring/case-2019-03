cd /usr/app
npm install
npm install --sg sequelize-cli
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
npm start 