import Joi from "joi"

export const createProductSchema = Joi.object({
    name:Joi.string().trim().min(3).max(100).required(),
    description:Joi.string().trim().min(10).max(1024).required(),
    categoryId:Joi.string().trim().hex().length(24).required(),
    offer:Joi.number().min(0.00).max(1.00),
    price:Joi.number().min(0).max(1000).required(),
    finalPrice:Joi.number().min(0).max(1000),
    quantity:Joi.number().integer().min(0),
    brand:Joi.string().valid("Nike","Levi's","Calvin Klein","Casio","Adidas","Biba").required(),
    image:Joi.any().required(),
}).when(
    Joi.object({ offer: Joi.number().valid(0) }), {
      then: Joi.object({
        price: Joi.number().valid(Joi.ref('finalPrice')).required(),
      }),
    }
);

export const updateProductSchema = Joi.object({
    name:Joi.string().trim().min(3).max(100).allow(""),
    description:Joi.string().trim().min(10).max(1024).allow(""),
    categoryId:Joi.string().trim().hex().length(24),
    offer:Joi.number().min(0.00).max(1.00),
    price:Joi.number().min(0).max(1000),
    finalPrice:Joi.number().min(0).max(1000),
    quantity:Joi.number().integer().min(0),
    brand:Joi.string().trim().valid("Nike","Levi's","Calvin Klein","Casio","Adidas","Biba"),
    image:Joi.any(),
}).when(
    Joi.object({ offer: Joi.number().valid(0) }), {
      then: Joi.object({
        price: Joi.number().valid(Joi.ref('finalPrice')).required(),
      }).required(),
    }
)