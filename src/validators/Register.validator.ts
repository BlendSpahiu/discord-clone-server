import Joi from 'joi';

export const RegisterValidator = Joi.object().keys({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': 'Email cannot be empty!',
        'string.email': 'Email must be valid!',
    }),
    username: Joi.string()
        .required()
        .messages({
            'string.empty': 'Username cannot be empty!',
            'string.min': 'Username needs to be at least 2 characters long.',
        })
        .min(2),
    password: Joi.string()
        .required()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/))
        .messages({
            'string.empty': 'Password cannot be empty!',
            'string.pattern.base':
                'Password must at least have 8 characters, one uppercase letter, one number and one special character.',
        }),
    dateOfBirth: Joi.string()
        .required()
        .pattern(new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[\\/-]\d{4}$/))
        .messages({
            'any.required': 'Date of birth cannot be empty!',
        }),
});
