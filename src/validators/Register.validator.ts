import Joi from 'joi';

export const RegisterValidator = Joi.object().keys({
    first_name: Joi.string().regex(/^\S+$/).required(),
    last_name: Joi.string().regex(/^\S+$/).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
});
