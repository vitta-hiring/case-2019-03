init:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up mysql_prescriptions -d
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
	npm run seed
	docker-compose up -d