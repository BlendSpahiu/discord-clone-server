import { Request, Response, NextFunction, Router } from 'express';
import PostModel from '../models/Post.model';

export const ArchivePostsController: Router = Router();

ArchivePostsController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get the date 30 days ago
        const date = new Date();
        const dateInSeconds = new Date().setDate(date.getDate() - 30);
        // get the timestamp version
        const expiryDate = new Date(dateInSeconds);

        // find posts whose date is older than 30 days
        await PostModel.query()
            .update({ is_archived: true })
            .where('created_at', '<', expiryDate)
            .orWhere('created_at', '=', expiryDate);
    } catch (err) {
        next(err);
    }
});
