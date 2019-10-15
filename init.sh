#!/usr/bin/env bash

cp backend/.env.example backend/.env
(cd backend; docker-compose build --no-cache)
(cd backend; docker-compose up -d)
(cd backend; docker-compose exec node adonis key:generate;)
sleep 10
(cd backend; docker-compose exec node adonis migration:run)
(cd backend; docker-compose exec node adonis seed)
(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/medicines.sql")
(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/medicine_pharmaco.sql")
(cd backend; docker-compose exec -T mysql bash -c "mysql -u root -pvitta_password assessment < dados/drugs_interaction.sql")
(cd frontend; docker-compose build --no-cache)
(cd frontend; docker-compose up -d)