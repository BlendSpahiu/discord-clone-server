import { Model } from 'objection';

export default class ResetPasswordModel extends Model {
    id!: number;
    email!: string;
    token!: string;
    expire_at!: Date;
    created_at?: Date;

    // Table name is the only required property.
    static get tableName() {
        return 'reset_password';
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    static jsonSchema = {
        type: 'object',
        required: ['email', 'token', 'expire_at'],

        properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            token: { type: 'string' },
            expire_at: { type: 'date' },
            created_at: { type: 'date' },
        },
    };
}
