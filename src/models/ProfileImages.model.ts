import { Model } from 'objection';

export default class ProfileImagesModel extends Model {
    id!: number;
    path!: string;
    size!: number;
    mime_type!: string;
    user_id!: number;
    created_at?: Date;
    updated_at?: Date;

    // Table name is the only required property.
    static get tableName() {
        return 'profile_images';
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['path','size','mime_type','user_id'],

            properties: {
                id: { type: 'integer' },
                path: { type: 'string' },
                size: { type: 'integer' },
                mime_type: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' },
            },
        };
    }

    // This object defines the relations to other models. The relationMappings
    // property can be a thunk to prevent circular dependencies.
    static get relationMappings() {
        return {};
    }
}
