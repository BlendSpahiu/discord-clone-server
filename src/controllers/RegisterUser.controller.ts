import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { RegisterUserService } from '../services/RegisterUser.service';
import { RegisterUserValidator } from '../validators/RegisterUser.validator';

export const RegisterUserController: Router = Router();

RegisterUserController.post(
    '/',
    ValidationMiddleware(RegisterUserValidator, {}, (req: Request) => req.body.input.data),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body.input;

            const result = await RegisterUserService.register(data);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
