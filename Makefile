init: init-back init-front

init-back:
	cp backend/.env.example backend/.env
	(cd backend; docker-compose up -d)
	(cd backend; docker-compose exec node adonis key:generate)

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