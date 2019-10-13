init: init-back init-front

init-back:
	cp backend/.env.example backend/.env
	(cd backend; docker-compose up -d)
	(cd backend; docker-compose exec node adonis key:generate)
	make migrate
	make seed
	make import-data

init-front:
	(cd frontend; docker-compose up -d)

start:
	(cd backend; docker-compose start)
	(cd frontend; docker-compose start)

restart:
	(cd backend; docker-compose restart)
	(cd frontend; docker-compose restart)

stop:
	(cd backend; docker-compose stop)
	(cd frontend; docker-compose stop)

bash-back:
	(cd backend; docker-compose exec node bash)

bash-front:
	(cd frontend; docker-compose exec node bash)

ps:
	(cd backend; docker-compose ps)
	(cd frontend; docker-compose ps)

migrate:
	(cd backend; docker-compose exec node adonis migration:run)

rollback:
	(cd backend; docker-compose exec node adonis migration:rollback)

seed:
	(cd backend; docker-compose exec node adonis seed)

import-data:
	(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/medicines.sql")
	(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/medicine_pharmaco.sql")
	(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/drugs_interaction.sql")