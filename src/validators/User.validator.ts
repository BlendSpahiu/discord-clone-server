import Joi from 'joi';

export const UserValidator = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
        .min(8)
        .max(32)
        .regex(RegExp('/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/'))
        .optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .optional(),
});
