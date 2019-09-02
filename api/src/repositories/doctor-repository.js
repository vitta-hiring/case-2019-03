'use strict'

var knex = require('../database/knex');

const table = 'doctors';

exports.get = async() => {
    return await knex.select().from(table);
};