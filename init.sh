#!/usr/bin/env bash

docker-compose build --no-cache
docker-compose up -d
sleep 10
(cd api; npm run seed)
(docker-compose restart)