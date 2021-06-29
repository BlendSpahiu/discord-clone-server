// express
import { Request, Response, NextFunction, Router } from 'express';

// middlewares
import { ValidationMiddleware } from '../middleware/Validation.middleware';

// services
import { LoginUserService } from '../services/LoginUser.service';

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
        } catch (err) {
            console.error(err);
        }
    }
);
