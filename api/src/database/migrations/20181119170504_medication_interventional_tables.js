
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('medication_intervention', function(table){
        table.increments('id').primary();;
        table.string('name').notNullable();
        table.string('pharmaco_one');
        table.string('pharmacos_two');
        table.text('description');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('medication_intervention');
};
