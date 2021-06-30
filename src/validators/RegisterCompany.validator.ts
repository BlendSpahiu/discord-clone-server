import Joi from 'joi';

export const RegisterValidator = Joi.object().keys({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    company_name: Joi.string().min(3).required(),
    bussines_number: Joi.string().min(3).required(),
});
