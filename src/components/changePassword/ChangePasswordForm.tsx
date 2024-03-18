import React, { useContext } from 'react'
import Input from '../shared/Input'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IChangePasswordForm, UserChangePassword } from '../../types/types';
import { UserContext } from '../features/UserFeature/UserProvider';
import useAxios from '../customHooks/useAxios';
import { toast } from 'react-toastify';

const schema = yup
    .object({
        currentPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
        newPassword: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
        confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')
            .min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    })

function ChangePasswordForm({ ReBuildFormClasses, UseTitle = true }: IChangePasswordForm) {
    const { theme } = useContext(ThemeContext);
    const { userData, userToken,setUserToken } = useContext(UserContext);
    const { PUT } = useAxios();
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UserChangePassword>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },

        resolver: yupResolver(schema),
    });


    const onSubmit: SubmitHandler<UserChangePassword> = async (submittedData) => {
        try {
            const { data } = await PUT("/users/changepassword", {
                oldPassword: submittedData.currentPassword,
                newPassword: submittedData.newPassword,
                confirmNewPassword: submittedData.confirmNewPassword,
                userId: userData._id
            }, userToken)
            console.log(data)
            if (data.message == "success") {
                setUserToken(data.token);
                localStorage.setItem("userTokenGeekOut",data.token)
                toast.success("Your password has been changed successfully!");
                reset()
            }
        } catch (error) {
            toast.error("Password Is Wrong Try Again")
            console.log(error)
        }
    }
    const inputs = [
        {
            type: "password",
            title: "Current Password:",
            placeholder: "current password",
            id: "current password",
            name: "currentPassword",
        },

        {
            type: "password",
            title: "New Password:",
            placeholder: "new password",
            id: "new password",
            name: "newPassword",
        },
        {
            type: "password",
            title: "Confirm New Password:",
            placeholder: "confirm new password",
            id: "confirm new password",
            name: "confirmNewPassword",
        },
    ]
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={`${ReBuildFormClasses ? `${ReBuildFormClasses}` : "-translate-y-16 border-solid border w-95% md:w-9/12 max-w-xl mx-auto p-3 md:p-4 rounded-2xl"}`}
            style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                boxShadow: theme == "dark" ? "var(--dark--boxShadow)" : "var(--light--boxShadow)"

            }}
        >
            {UseTitle && <h2 className='text-2xl font-semibold mb-5'>Change Password</h2>}
            {
                inputs.map((input, index) => {
                    return (
                        <Input register={register} type={input.type} title={input.title} id={input.id} placeholder={input.placeholder}
                            trigger={trigger} name={input.name} key={index} errors={errors} />
                    )
                })
            }
            <button className='rounded-md bg-color-accent text-white border border-color-accent 
            duration-300 hover:text-color-accent hover:bg-transparent px-4 py-1'>
                Save Changes
            </button>
        </form>
    )
}

export default ChangePasswordForm