import Joi from 'joi';

export const LoginValidator = Joi.object().keys({
    email: Joi.string()
        .email({
            tlds: { allow: false },
        })
        .trim()
        .required(),
    password: Joi.string().trim().min(8).required(),
});
