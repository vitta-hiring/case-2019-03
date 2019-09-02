#!/bin/bash
cd /usr/app
npm install
npm install -g knex 
knex migrate:latest
knex seed:run
npm start