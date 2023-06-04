import { NextFunction, Request, Response } from 'express';
import { AsyncValidationOptions, ObjectSchema } from 'joi';
import jwt from 'jsonwebtoken';

import { failure } from '../utils/responses';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { JWT_SECRET } from '../config/jwt';

const getPayload = (req: Request) => {
    return { ...req.body.input.data, ...req.params };
};

export const ValidationMiddleware = (
    schema: ObjectSchema | null,
    options: AsyncValidationOptions = {},
    payload: (req: Request) => unknown = getPayload
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema) {
                await schema.validateAsync(payload(req), options);
            }

            return next();
        } catch (err: any) {
            console.log(err);

            const result = failure(err?.message, StatusCodeEnums.UNPROCESSABLE_ENTITY);
            res.status(400).send(result.data);
        }
    };
};

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenArray = req.headers.authorization?.split(' ');
        const token = tokenArray?.[1];
        jwt.verify(token || '', JWT_SECRET);

        return next();
    } catch (err: any) {
        const result = failure(err?.message);
        if (err?.message === 'jwt must be provided') {
            res.status(403).send(result.data);
            return;
        }
        res.status(result.httpCode).send(result.data);
    }
};
