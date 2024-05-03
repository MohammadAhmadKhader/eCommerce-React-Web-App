import Joi from "joi"
import { tlds } from '@hapi/tlds';

export const contactUsSchema = Joi.object({
    fullName: Joi.string().min(4).max(32),
    email: Joi.string().email({ tlds: { allow: tlds } }).min(7).max(64),
    subject: Joi.string().min(4).max(32),
    message: Joi.string().min(4).max(256),
})