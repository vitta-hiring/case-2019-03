'use strict'

var knex = require('../database/knex');

const table = 'medications';

exports.get = async() => {
    return await knex.select().from(table);
};