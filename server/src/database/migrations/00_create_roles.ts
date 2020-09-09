import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('roles', table => {
        table.string('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('roles');
}