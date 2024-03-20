import Input from '../shared/Input'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { useNavigate } from 'react-router-dom'
import useAxios from '../customHooks/useAxios'
import { toast } from 'react-toastify'
import { UserForgotPassword } from '../../types/types'

const schema = yup
    .object({
        email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
    })
function ForgotPassword() {
    const navigate = useNavigate()
    const { POST } = useAxios()
    const { theme } = useContext(ThemeContext);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors,isSubmitting }
    } = useForm<UserForgotPassword>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<UserForgotPassword> = async (submittedData) => {
        console.log(submittedData)
        try {
            const { data } = await POST("/users/forgotPassword", {
                email: submittedData.email,
            })
            if(data["message"]=="success"){
                toast.success("A Message has been sent to your email");
                navigate("/")
            }
        } catch (error) {
            console.error(error)
            toast.error("Something Went Wrong Please Try Again Later")
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center' style={{ minHeight: "800px" }}>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='-translate-y-16 w-9/12 max-w-xl m-auto p-4 rounded-2xl border-solid border'
                    style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                        boxShadow: theme == "dark" ? "var(--dark--boxShadow)" : "var(--light--boxShadow)"
                    }}
                >
                    <h2 className='text-2xl font-semibold mb-5'>Request password reset</h2>

                    <Input register={register} type={"email"} title={"Email:"} id={"email"} placeholder={"email"}
                        trigger={trigger} errors={errors} name={"email"} />

                    <button className='bg-color-accent text-white hover:bg-transparent hover:text-color-accent
                    border-color-accent font-semibold text-sm border 
                     hover:text-white duration-300 px-6 py-1.5 rounded-md disabled:hover:bg-color-accent disabled:hover:text-white'
                     type='submit' disabled={isSubmitting}
                     >
                        Send
                    </button>
                </form></div>
        </div>
    )
}

export default ForgotPassword