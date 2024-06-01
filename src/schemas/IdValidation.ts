import Joi from "joi"

export const objectIdSchemaRequired = Joi.object({
    productId: Joi.string().trim().length(24).hex().required()
});

export const objectIdSchemaOptional = Joi.object({
    categoryId: Joi.string().trim().length(24).hex()
});