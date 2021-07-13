import Joi from 'joi';

export const RegisterCompanyValidator = Joi.object().keys({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    company_name: Joi.string().min(3).required(),
    business_number: Joi.number().min(3).required(),
    file_id: Joi.number().required(),
});
