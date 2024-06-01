import Joi from "joi";

const fileSchema = Joi.object({
    lastModified:Joi.number().integer().required(),
    lastModifiedDate:Joi.date().required(),
    size:Joi.number().integer().required(),
    type:Joi.string().min(0).required(),
    webkitRelativePath:Joi.string().allow("").required(),
    name:Joi.string().min(0).required(),
})

export const createCategorySchema = Joi.object({
    name: Joi.string().trim().min(2).max(64).required(),
    image:Joi.any().required()
}).required()

export const updateCategorySchema = Joi.object({
    name: Joi.string().trim().min(2).max(64),
    image:Joi.any()
}).min(1).required()