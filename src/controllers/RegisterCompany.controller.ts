import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { RegisterCompanyService } from '../services/RegisterCompany.service';
import { RegisterValidator } from '../validators/RegisterCompany.validator';

export const RegisterCompanyController: Router = Router();

RegisterCompanyController.post(
    '/',
    ValidationMiddleware(RegisterValidator, {}, (req: Request) => req.body.input),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body.input;
            console.log('data', data);
            

            const result = await RegisterCompanyService.registerCompany(data);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
