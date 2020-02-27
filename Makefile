init:
	make down
	sleep 5
	make up
	sleep 10
	$(info Frontend is running on http://localhost:3124)
	$(info Backend is running on http://localhost:3123)

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

ps:
	docker-compose ps

down:
	docker-compose down -v

up:
	docker-compose up -d --build