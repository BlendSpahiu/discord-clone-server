import { Model } from 'objection';

export default class PostModel extends Model {
    id!: number;
    description!: string;
    number_of_responses!: number;
    number_of_views!: number;
    user_id!: number;
    status!: boolean;
    is_archived!: boolean;
    is_favourite!: boolean;
    created_at?: Date;
    updated_at?: Date;

    // Table name is the only required property.
    static get tableName() {
        return 'posts';
    }

    // This object defines the relations to other models. The relationMappings
    // property can be a thunk to prevent circular dependencies.
    static get relationMappings() {
        return {};
    }
}
