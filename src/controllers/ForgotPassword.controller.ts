import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { ForgotPasswordService } from '../services/ForgotPassword.service';
import { ForgotPasswordValidator } from '../validators/ForgotPassword.validator';

export const ForgotPasswordController: Router = Router();

ForgotPasswordController.post(
    '/',
    ValidationMiddleware(ForgotPasswordValidator, {}, (req: Request) => req.body.input),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body.input;
            const result = await ForgotPasswordService.forgotPassword(email);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
