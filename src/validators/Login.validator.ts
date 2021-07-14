import Joi from 'joi';

export const LoginValidator = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
});
