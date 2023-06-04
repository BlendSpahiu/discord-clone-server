import { Request, Response, NextFunction, Router } from 'express';
import { AuthMiddleware, ValidationMiddleware } from '../middleware/Validation.middleware';
import { PostService } from '../services/Post.service';
import { PostValidator } from '../validators/Post.validator';

export const PostController: Router = Router();

PostController.post(
    '/',
    ValidationMiddleware(PostValidator, {}, (req: Request) => req.body.input.data),
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await PostService.createPost(data);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);

PostController.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await PostService.getAllPosts();

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

PostController.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await PostService.getPostById(+id);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

PostController.put(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await PostService.updatePost(+id, data);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);
