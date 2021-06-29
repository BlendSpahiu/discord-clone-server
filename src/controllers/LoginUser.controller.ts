// express
import { Request, Response, NextFunction, Router } from 'express';

// middlewares
import { ValidationMiddleware } from '../middleware/Validation.middleware';

// services
import { LoginUserService } from '../services/LoginUser.service';

// utils
import { ok } from '../utils';

// validators
import { LoginUserValidator } from '../validators/LoginUser.validator';

export const LoginUserController: Router = Router();

LoginUserController.post(
    '/',
    ValidationMiddleware(LoginUserValidator, {}, (req: Request) => req.body.input),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body.input;

            const result = await LoginUserService.login(email, password);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
