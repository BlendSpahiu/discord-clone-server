import { Model } from 'objection';
import CompanyModel from './Company.model';

export default class UserModel extends Model {
    id!: number;
    username!: string;
    tag!: number;
    email!: string;
    friends!: string[];
    phoneNumber!: string;
    dateOfBirth!: string;
    password!: string;
    file_id!: string;
    servers!: string[];
    role!: string;
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
            required: ['username', 'email', 'password', 'role'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                tag: { type: 'integer' },
                email: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' },
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
