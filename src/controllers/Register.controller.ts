import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { RegisterService } from '../services/Register.service';
import { RegisterValidator } from '../validators/Register.validator';

export const RegisterController: Router = Router();

RegisterController.post(
    '/',
    ValidationMiddleware(RegisterValidator, {}, (req: Request) => req.body.input.obj),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body.input.obj;

            const result = await RegisterService.register(data);

            console.log(result);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            console.log(err);

            next(err);
        }
    }
);
