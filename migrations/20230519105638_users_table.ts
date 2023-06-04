import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.integer('file_id').nullable();
        table.dateTime('created_at', { useTz: true }).defaultTo(knex.fn.now()).nullable();
        table.dateTime('updated_at', { useTz: true }).defaultTo(knex.fn.now()).nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users');
}
