
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('prescription', function(table){
        table.increments('id').primary();;
        table.string('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('patient_id').unsigned().references('id').inTable('patients');
        table.integer('doctor_id').unsigned().references('id').inTable('doctors');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prescription');
};
