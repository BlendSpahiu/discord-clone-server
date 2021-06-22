import { NextFunction, Request, Response } from 'express';
import { AsyncValidationOptions, ObjectSchema } from 'joi';

import { failure } from '../utils/responses';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

const getPayload = (req: Request) => {
    return { ...req.body.input.data, ...req.params };
};

export const ValidationMiddleware = (
    schema: ObjectSchema,
    options: AsyncValidationOptions = {},
    payload: (req: Request) => unknown = getPayload
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(payload(req), options);
            return next();
        } catch (err) {
            const result = failure(err?.details?.[0]?.message, StatusCodeEnums.UNPROCESSABLE_ENTITY);
            res.status(result.httpCode).send(result.data);
        }
    };
};
