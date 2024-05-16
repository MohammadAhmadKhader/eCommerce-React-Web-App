import Joi from "joi"
import { tlds } from '@hapi/tlds';
import * as yup from "yup"

export const createUserSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: tlds } }).min(5).max(64).required(),
    firstName: Joi.string().min(4).max(32).required(),
    lastName: Joi.string().min(4).max(32).required(),
    password: Joi.string().min(6).max(24).required(),
    role: Joi.string().valid("user","admin"),
    userImg:Joi.any(),
}).required()

export const userSignInSchema = yup.object({
    email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
    password: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
})

export const resetUserPasswordSchema = yup.object({
    newPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    confirmedNewPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
})

export const userSignUpSchema = yup.object({
    email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
    firstName: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    lastName: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    password: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
}).required()

export const changedPasswordSchema = yup.object({
    currentPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    newPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
        .min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
})

export const userInformationSchema = Joi.object({
    firstName: Joi.string().min(4).max(32).allow(""),
    lastName: Joi.string().min(4).max(32).allow(""),
    email: Joi.string().email({ tlds: { allow: tlds } }).min(7).max(64).allow(""),
    mobileNumber: Joi.string().min(7).max(20).allow(""),
    userImg: Joi.any(),
    // minimum is before 80 years from now and max is before 5 years from now
    birthDate: Joi.date().max(new Date(Date.now() - 157680000000)).min(new Date(Date.now() - 2522880000000)).allow(""),
})

export const forgotPasswordSchema = yup.object({
    email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
})