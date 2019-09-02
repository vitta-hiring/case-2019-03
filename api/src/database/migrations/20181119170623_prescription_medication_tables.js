
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('prescriptions_medications', function(table){
        table.increments('id').primary();
        table.integer('prescription_id').unsigned().references('id').inTable('prescription');
        table.integer('medication_id').unsigned().references('id').inTable('medications');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prescriptions_medications');
};
