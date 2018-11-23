#!/bin/bash
cd /app/api
npm install
knex migrate:latest
knex seed:run
npm start