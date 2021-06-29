import Joi from 'joi';

export const LoginUserValidator = Joi.object().keys({
    email: Joi.string().email().min(8).required(),
    password: Joi.string().required(),
});
