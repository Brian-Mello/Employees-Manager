import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('employees', table => {
        table.string('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('birthdate').notNullable();
        table.string('salary').notNullable();

        table.string('position_id').notNullable().references('id').inTable('position');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('employees');
}