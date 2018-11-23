'use strict'

var knex = require('../database/knex');

const table = 'medication_intervention';

exports.get = async() => {
    return await knex.select().from(table);
};

exports.checkMedicationIntervention = async( medications ) => {
    return await knex
    .select('name','pharmaco_one','pharmacos_two','description')
    .from(table)
    .whereIn('pharmaco_one', medications)
    .whereIn('pharmacos_two', medications);
};