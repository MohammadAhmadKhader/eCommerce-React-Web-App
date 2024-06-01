import * as yup from "yup"

export const editReviewSchema = yup.object({
    comment: yup.string().trim().min(4).max(256).required(),
    rating: yup.number().oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).required()
})

export const addReviewSchema = yup.object({
    comment: yup.string().trim().min(4).max(256).required(),
    rating: yup.number().oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).required()
})
