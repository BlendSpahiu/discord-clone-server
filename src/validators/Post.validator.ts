import Joi from 'joi';

export const PostValidator = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user_id: Joi.number().required(),
});

export const PostByIdValidator = Joi.object().keys({
    id: Joi.number().required(),
});
