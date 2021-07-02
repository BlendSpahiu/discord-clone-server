import { Request, Response, NextFunction, Router } from 'express';
import { ValidationMiddleware } from '../middleware/Validation.middleware';
import { RegisterCompanyService } from '../services/RegisterCompany.service';
import { upload } from '../utils';
import { RegisterCompanyValidator } from '../validators/RegisterCompany.validator';

export const RegisterCompanyController: Router = Router();

RegisterCompanyController.post(
    '/',
    upload.single('image'),
    ValidationMiddleware(RegisterCompanyValidator, {}, (req: Request) => req.body.input.data),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body.input;

            const result = await RegisterCompanyService.registerCompany(data);

            res.status(result.httpCode).send(result.data);
        } catch (err) {
            next(err);
        }
    }
);
