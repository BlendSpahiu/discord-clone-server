import Joi from 'joi';

export const ResetPasswordValidator = Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().trim().min(8).required(),
});
