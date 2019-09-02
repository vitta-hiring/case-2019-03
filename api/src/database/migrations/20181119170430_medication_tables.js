
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('medications', function(table){
        table.increments('id').primary();;
        table.string('name').notNullable();
        table.string('pharmaco');
        table.string('pharmacos');
        table.string('concentration');
        table.string('unit');
        table.string('type_medication');
        table.string('pharmaceutical_form');
        table.string('via_administration');
        table.string('code_atc');
        table.boolean('use_intern');
        table.boolean('antimicrobial');
        table.string('bula');
        table.string('ordinance');
        table.boolean('control_special');
        table.string('tiss');
        table.boolean('mip');
        table.string('label');
        table.string('Unified');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('medications');
};
