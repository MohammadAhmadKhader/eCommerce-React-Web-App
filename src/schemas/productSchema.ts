import Joi from "joi"

const finalPriceSchema = Joi.number().when("offer",{
  is:Joi.number().valid(0,""),
  then:Joi.number().default(Joi.ref('price')).equal(Joi.ref('price'))
  .messages({"any.only":"If offer is 0, price and final price must be equal"}),
  otherwise:Joi.number().custom((value,helpers)=>{
    const price = helpers.state.ancestors[0].price;
    const offer = helpers.state.ancestors[0].offer;
    const tolerance = price * 0.05;
    const lowerBound = price - (price * offer) - tolerance;
    const upperBound = price - (price * offer) + tolerance;

    if(value > price || value > upperBound || value < lowerBound || value === price){
      return helpers.error('any.custom');
    }
    return value
  })
}).error((errors)=>{
  
  console.log(errors)
  errors.forEach((err)=>{
    console.log(err)
  })  
  return errors;}).messages({"any.custom":`final price must be within range of (5% x price x offer)`})

const productImageSchema = Joi.any().custom((value,helpers)=>{
  if(!(value instanceof Blob)){
    return helpers.error('any.custom');
  }
  return value
}).messages({"any.custom":"Image must be a file."})

export const createProductSchema = Joi.object({
    name:Joi.string().trim().min(3).max(100).required(),
    description:Joi.string().trim().min(10).max(1024).required(),
    categoryId:Joi.string().trim().hex().length(24).required(),
    offer:Joi.number().min(0.00).max(1.00),
    price:Joi.number().min(0).max(1000).required(),
    finalPrice:finalPriceSchema,
    quantity:Joi.number().integer().min(0).default(1),
    brand:Joi.string().min(1).max(32).trim().required(),
    image:productImageSchema.required(),
})

export const updateProductSchema = Joi.object({
    name:Joi.string().trim().min(3).max(100).allow(""),
    description:Joi.string().trim().min(10).max(1024).allow(""),
    categoryId:Joi.string().trim().hex().length(24),
    offer:Joi.number().min(0.00).max(1.00),
    price:Joi.number().min(0).max(1000),
    finalPrice:finalPriceSchema,
    quantity:Joi.number().integer().min(0),
    brand:Joi.string().min(1).max(32).trim(),
    image:productImageSchema
})