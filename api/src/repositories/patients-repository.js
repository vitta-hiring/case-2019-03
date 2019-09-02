'use strict'

var knex = require('../database/knex');

const table = 'patients';

exports.get = async() => {
    return await knex.select().from(table);
};