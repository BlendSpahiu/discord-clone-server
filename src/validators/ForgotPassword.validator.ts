import Joi from 'joi';

export const ForgotPasswordValidator = Joi.object().keys({
    email: Joi.string()
        .email({
            tlds: { allow: false },
        })
        .trim()
        .required(),
});
