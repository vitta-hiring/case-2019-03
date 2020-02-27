#!/usr/bin/env bash

docker-compose down -v
docker-compose build
# docker-compose up -d mysql_prescriptions
# sleep 10
docker-compose up -d