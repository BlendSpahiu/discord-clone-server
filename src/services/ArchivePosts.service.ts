import PostModel from '../models/Post.model';
import { ok } from '../utils';

export const ArchivePostService = {
    archive: async () => {
        // get the date 30 days ago
        const date = new Date();
        const dateInSeconds = new Date().setDate(date.getDate() - 30);
        // get the timestamp version
        const expiryDate = new Date(dateInSeconds);

        // find posts whose date is older than 30 days
        const expiredPosts = await PostModel.query()
            .whereNot('is_archived', 'true')
            .where((condition) =>
                condition.where('updated_at', '<', expiryDate).orWhere('updated_at', '=', expiryDate)
            );

        if (expiredPosts.length === 0) return ok({});

        expiredPosts.forEach(async (post: PostModel) => {
            const { id } = post;
            await PostModel.query().findById(id).patch({ is_archived: true });
        });

        return ok({});
    },
};
