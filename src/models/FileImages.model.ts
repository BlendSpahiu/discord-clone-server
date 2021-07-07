import { Model } from 'objection';

export default class FileImagesModel extends Model {
    id!: number;
    original_name!: string;
    file_name!: string;
    file_path!: string;
    file_size!: number;
    mime_type!: string;
    created_at?: Date;
    updated_at?: Date;

    // Table name is the only required property.
    static get tableName() {
        return 'file_images';
    }

    // Optional JSON schema. This is not the database schema!
    // No tables or columns are generated based on this. This is only
    // used for input validation. Whenever a model instance is created
    // either explicitly or implicitly it is checked against this schema.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['original_name', 'file_name', 'file_path', 'file_size', 'mime_type'],

            properties: {
                id: { type: 'integer' },
                original_name: { type: 'string' },
                file_name: { type: 'string' },
                file_path: { type: 'string' },
                file_size: { type: 'integer' },
                mime_type: { type: 'string' },
                created_at: { type: 'date' },
                updated_at: { type: 'date' },
            },
        };
    }
}
