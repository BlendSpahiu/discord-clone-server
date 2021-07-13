import { Model } from 'objection';
import CompanyModel from './Company.model';

export default class UserModel extends Model {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    role!: string;
    file_id?: number;
    created_at?: Date;
    updated_at?: Date;

    // Table name is the only required property.
    static get tableName() {
        return 'users';
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['first_name', 'last_name', 'email', 'password', 'role', 'file_id'],

            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' },
                file_id: { type: 'integer' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' },
            },
        };
    }

    // This object defines the relations to other models. The relationMappings
    // property can be a thunk to prevent circular dependencies.
    static get relationMappings() {
        return {
            companies: {
                relation: Model.HasOneRelation,
                modelClass: CompanyModel,
                join: {
                    from: 'users.id',
                    to: 'companies.user_id',
                },
            },
        };
    }
}
