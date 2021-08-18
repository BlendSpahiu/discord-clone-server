import { Request, Response, NextFunction, Router } from 'express';
import { ArchivePostService } from '../services/ArchivePosts.service';

export const ArchivePostsController: Router = Router();

ArchivePostsController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ArchivePostService.archive();

        res.status(result.httpCode).send(result.data);
    } catch (err) {
        next(err);
    }
});
