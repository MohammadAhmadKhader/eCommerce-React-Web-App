import Input from '../shared/Input'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { ResetPasswordForm } from '../../types/types'
import useAxios from '../customHooks/useAxios'
import { toast } from 'react-toastify'
import useDebounce from '../customHooks/useDebounce'

const schema = yup
    .object({
        newPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
        confirmedNewPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    })
function ResetPassword() {
    // Debouncing mechanism against spam
    const navigate = useNavigate()
    const params = useParams()
    const { PATCH } = useAxios()
    const { theme } = useContext(ThemeContext);
    const token = params.token;
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        formState: { errors ,isSubmitting}
    } = useForm<ResetPasswordForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ResetPasswordForm> = async (submittedData) => {
        try {
            const { data } = await PATCH(`/users/resetPassword/${token}`, {
                newPassword: submittedData.newPassword,
                confirmedNewPassword: submittedData.confirmedNewPassword
            });


            if (data["message"] == "success") {
                toast.success("Password has changed successfully!");
                reset()
                navigate("/")
            }

        } catch (error) {

            console.error(error)
            toast.error("Something Went Wrong Please Try Again Later");
        }
    }

    return (
        <div className=''>
            <div className='flex justify-center items-center' style={{ minHeight: "800px" }}>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='-translate-y-16 w-9/12 max-w-xl m-auto p-4 rounded-2xl border-solid border'
                    style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                        boxShadow: theme == "dark" ? "var(--dark--boxShadow)" : "var(--light--boxShadow)"
                    }}
                >
                    <h2 className='text-2xl font-semibold mb-5'>Reset password</h2>

                    <Input register={register} type={"password"} title={"New password"} id={"newPassword"} placeholder={"password"}
                        trigger={trigger} errors={errors} name={"newPassword"} />
                    <Input register={register} type={"password"} title={"Confirm new password"} id={"confirmNewPassword"} placeholder={"confirm password"}
                        trigger={trigger} errors={errors} name={"confirmedNewPassword"} />

                    <button className='bg-color-accent text-white hover:bg-transparent hover:text-color-accent
                    border-color-accent font-semibold text-sm border 
                     hover:text-white duration-300 px-6 py-1.5 rounded-md disabled:hover:bg-color-accent disabled:hover:text-white'
                        type='submit' disabled={isSubmitting}
                    >
                        Reset
                    </button>
                </form></div>
        </div>
    )
}

export default ResetPassword