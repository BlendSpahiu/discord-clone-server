import { Request, Response, Router } from 'express';

export const PingController: Router = Router();

PingController.get('/', async (req: Request, res: Response) => {
    res.send({ data: 'pong' });
});
