import { Router, NextFunction, Request, Response } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { ResetPasswordService } from '../services/ResetPassword.service';
import { ResetPasswordValidator } from '../validators/ResetPassword.validator';

export const ResetPasswordController: Router = Router();

ResetPasswordController.post(
    '/',
    ValidationMiddleware(ResetPasswordValidator, {}, (req: Request) => req.body.input),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token, password } = req.body.input;

            const result = await ResetPasswordService.resetPassword(token, password);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
