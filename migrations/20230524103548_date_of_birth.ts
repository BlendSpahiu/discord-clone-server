import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable('posts');
    return await knex.schema.alterTable('users', (table) => {
        table.string('dateOfBirth').notNullable().defaultTo('');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('dateOfBirth');
    });
}
