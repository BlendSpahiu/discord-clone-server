import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('posts', (table) => {
        table.increments('id');
        table.string('title').notNullable();
        table.string('description').nullable();
        table.integer('number_of_views').notNullable().defaultTo(0);
        table.integer('number_of_responses').notNullable().defaultTo(0);
        table.integer('user_id').references('id').inTable('users');
        table.boolean('status').notNullable();
        table.boolean('is_archived').notNullable().defaultTo(false);
        table.boolean('is_favorite').notNullable().defaultTo(false);
        table.dateTime('created_at', { useTz: true }).nullable().defaultTo(knex.fn.now());
        table.dateTime('updated_at', { useTz: true }).nullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('posts');
}
