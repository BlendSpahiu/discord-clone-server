import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('users', (table) => {
        table.string('email').notNullable().defaultTo('blendi@gmail.com');
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('users', (table) => {
        table.dropColumn('email');
    });
}
