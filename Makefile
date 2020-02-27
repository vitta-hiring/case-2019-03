init:
	docker-compose build --no-cache
	docker-compose up -d
	sleep 10
	make import-data

init-frontend:
	(cd frontend; docker-compose build --no-cache)
	(cd frontend; docker-compose up -d)

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

ps:
	docker-compose ps

import-data:
	npm run seed
	make restart