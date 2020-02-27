#!/usr/bin/env bash

docker-compose down -v
sleep 5
docker-compose up -d --build
sleep 10