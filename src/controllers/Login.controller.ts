import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { LoginService } from '../services/Login.service';
import { LoginValidator } from '../validators/Login.validator';

export const LoginController: Router = Router();

LoginController.post(
    '/',
    ValidationMiddleware(LoginValidator, {}, (req: Request) => req.body.input),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body.input;

            const result = await LoginService.login(email, password);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
