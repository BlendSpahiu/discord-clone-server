import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import PostModel from '../models/Post.model';
import { failure, ok } from '../utils';

export const PostService = {
    createPost: async (data: PostModel) => {
        // get the request body
        const { title, description, user_id } = data;

        // create post
        const post = await PostModel.query().insert({ title, description, user_id });

        return ok({ post });
    },

    getAllPosts: async () => {
        const posts = await PostModel.query();

        return ok({ posts });
    },

    getPostById: async (id: number) => {
        const post = await PostModel.query().findById(id);

        return ok({ post });
    },

    updatePost: async (id: number, data: PostModel) => {
        // check if post exists
        const postExists = await PostModel.query().findById(id);
        if (!postExists) {
            return failure('Post not found', StatusCodeEnums.NOT_FOUND);
        }

        const { title, description } = data;

        const updatedPost = await PostModel.query()
            .where({ id })
            .update({
                title: title || postExists.title,
                description: description || postExists.description,
            });

        return ok({ post: updatedPost });
    },
};
