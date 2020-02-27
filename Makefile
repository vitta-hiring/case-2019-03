init:
	docker-compose build --no-cache
	docker-compose up -d
	sleep 10
	make import-data

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

ps:
	docker-compose ps

import-data:
	make stop
	npm run seed
	make restart