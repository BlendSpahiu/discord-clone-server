import { NextFunction, Request, Response, Router } from 'express';
import { AuthMiddleware } from '../middleware/Validation.middleware';
import { ServerService } from '../services/Server.service';

export const ServerController: Router = Router();

ServerController.post(
    '/',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { serverName, userId } = req.body;

            const result = await ServerService.createServer({ serverName, userId });

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

ServerController.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ServerService.getServers();

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

ServerController.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await ServerService.getServerById(+id);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

ServerController.put(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const { serverName } = req.body;
            const result = await ServerService.updateServer(+id, serverName);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);
