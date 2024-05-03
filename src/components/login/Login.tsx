import Input from '../shared/Input'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { Link, useNavigate } from 'react-router-dom'
import { UserSignInDataType } from '../../types/types'
import useAxios from '../customHooks/useAxios'
import { UserContext } from '../features/UserFeature/UserProvider'
import { toast } from 'react-toastify'
import { userSignInSchema } from '../../schemas/userSchemas'


function Login() {
    const navigate = useNavigate()
    const { POST } = useAxios()
    const { theme } = useContext(ThemeContext);
    const { setUserToken, setUserData } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm<UserSignInDataType>({
        resolver: yupResolver(userSignInSchema)
    });

    const onSubmit: SubmitHandler<UserSignInDataType> = async (submittedData) => {
        console.log(submittedData)
        try {
            const { data } = await POST("/users/signin", {
                email: submittedData.email,
                password: submittedData.password
            })
            console.log(submittedData)
            if (data["user"]) {
                setUserToken(data.token);
                setUserData(data.user);
                localStorage.setItem("userTokenGeekOut", data.token)
                toast.success("You have sign in successfully!")
                navigate("/")
            }

        } catch (error) {
            console.error(error)
            toast.error("Email or password is wrong!")
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
                    <h2 className='text-2xl font-semibold mb-5'>Sign In</h2>

                    <Input register={register} type={"email"} title={"Email:"} id={"email"} placeholder={"email"}
                        trigger={trigger} errors={errors} name={"email"} />

                    <Input register={register} type={"password"} title={"Password:"} id={"password"} placeholder={"password"}
                        trigger={trigger} errors={errors} name={"password"} parentCustomClass='mb-0' />

                    <Link className='block text-blue-700 underline w-fit text-sm font-semibold mb-5' to="/forgotPassword">Forgot password ?</Link>
                    <button className='bg-color-accent text-white hover:bg-transparent hover:text-color-accent
                    border-color-accent font-semibold text-sm border duration-300 px-6 py-1.5 rounded-md
                     disabled:hover:text-white disabled:hover:bg-color-accent disabled:hover:cursor-default disabled:opacity-75
                     '
                        type='submit' disabled={isSubmitting}
                    >
                        Login
                    </button>
                    <Link className='ms-auto mt-2 block text-blue-700 underline w-fit text-sm font-semibold' to="/signup">Sign Up?</Link>
                </form></div>
        </div>
    )
}

export default Login