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
        const posts = await PostModel.query()
            .where('created_at', '<', expiryDate)
            .orWhere('created_at', '=', expiryDate);

        if (posts.length === 0) return ok({});

        await PostModel.query().update({ is_archived: true });
        return ok({});
    },
};
