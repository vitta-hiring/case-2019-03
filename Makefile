init:
	cp .env.example .env
	docker-compose up -d
	docker-compose exec node adonis key:generate

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

bash:
	docker-compose exec node bash

ps:
	docker-compose ps
