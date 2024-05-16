import Joi from 'joi';

export const createBrandSchema = Joi.object({
    brandName: Joi.string().min(1).max(32).required(),
    brandLogo:Joi.any().required()
}).required();

export const updateBrandSchema = Joi.object({
    brandName: Joi.string().min(1).max(32),
    brandLogo:Joi.any()
}).min(1).required();