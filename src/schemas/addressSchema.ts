import * as yup from "yup"

export const addressSchema = yup.object({
    street: yup.string().trim().min(4, "Minimum characters allowed is 4").max(64, "Max characters allowed is 64").required(),
    fullName: yup.string().trim().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    state: yup.string().trim().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    city: yup.string().trim().min(3, "Minimum characters allowed is 3").max(32, "Max characters allowed is 64").required(),
    mobileNumber: yup.string().trim().min(6, "Minimum characters allowed is 4").max(15, "Max characters allowed is 64").required(),
    pinCode: yup.string().trim().min(2, "Minimum characters allowed is 2").max(12, "Max characters allowed is 64").required(),
})
