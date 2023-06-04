import * as Knex from 'knex';
import { uniqueNamesGenerator, adjectives, colors, countries, NumberDictionary } from 'unique-names-generator';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('servers', (table) => {
        table.increments('id');
        table
            .string('serverName')
            .notNullable()
            .defaultTo(uniqueNamesGenerator({ dictionaries: [colors, adjectives, countries], separator: '-' }));
        table.specificType('members', 'jsonb[]').defaultTo(null);
        table.specificType('textChannels', 'jsonb[]').defaultTo(null);
        table.specificType('voiceChannels', 'jsonb[]').defaultTo(null);
    });

    await knex.schema.alterTable('users', (table) => {
        table.string('phoneNumber').nullable();
        table.string('displayName').nullable();
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table
            .string('username')
            .notNullable()
            .defaultTo(
                uniqueNamesGenerator({
                    dictionaries: [colors, adjectives, NumberDictionary.generate()],
                    separator: '-',
                })
            );
        table.boolean('isDisabled').nullable().defaultTo(false);
        table.specificType('friends', 'jsonb[]').defaultTo(null);
        table
            .integer('tag', 4)
            .notNullable()
            .defaultTo(Math.floor(1000 + Math.random() * 9000));
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('servers');
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('phoneNumber');
        table.dropColumn('displayName');
        table.string('first_name');
        table.string('last_name');
        table.dropColumn('username');
        table.dropColumn('isDisabled');
        table.dropColumn('friends');
        table.dropColumn('tag');
    });
}
