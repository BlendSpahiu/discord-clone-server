import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/User.service';
import { AuthMiddleware, ValidationMiddleware } from '../middleware/Validation.middleware';
import { UserValidator } from '../validators/User.validator';

export const UserController: Router = Router();

UserController.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await UserService.getAllUsers();

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

UserController.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await UserService.getUserById(+id);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);

UserController.put(
    '/:id',
    ValidationMiddleware(UserValidator, {}, async (req: Request) => req.body),
    (req: Request, res: Response, next: NextFunction) => AuthMiddleware(req, res, next),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodyData = req.body;
            const { id } = req.params;
            const result = await UserService.updateUser(+id, bodyData);

            res.status(result.httpCode).send(result.data);
        } catch (error) {
            next(error);
        }
    }
);
