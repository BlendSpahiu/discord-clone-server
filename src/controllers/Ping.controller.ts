import { NextFunction, Request, Response, Router } from 'express';

export const PingController: Router = Router();

PingController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send({ data: 'pong' });
});
