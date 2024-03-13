import Input from '../shared/Input'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { Link, useNavigate } from 'react-router-dom'
import { UserSignInDataType } from '../../types/types'
import useAxios from '../customHooks/useAxios'
import { UserContext } from '../features/UserFeature/UserProvider'
import { toast } from 'react-toastify'

const schema = yup
    .object({
        email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
        password: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
    })

function Login() {
    const navigate = useNavigate()
    const { POST } = useAxios()
    const { theme } = useContext(ThemeContext);
    const { setUserToken, setUserData } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm<UserSignInDataType>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<UserSignInDataType> = async (submittedData) => {
        console.log(submittedData)
        try {
            const { data } = await POST("/users/signin", {
                email: submittedData.email,
                password: submittedData.password
            })
            
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

    const inputs = [
        {
            type: "email",
            title: "Email:",
            placeholder: "email",
            id: "email",
            name: "email",

        },
        {
            type: "password",
            title: "Password:",
            placeholder: "password",
            id: "password",
            name: "password",
        }
    ]



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
                    <h2 className='text-2xl font-semibold mb-5'>Sign In</h2>
                    {
                        inputs.map((input, index) => {
                            return (
                                <Input register={register} type={input.type} title={input.title} id={input.id} placeholder={input.placeholder}
                                    trigger={trigger} errors={errors} name={input.name} key={index} />
                            )
                        })
                    }
                    <button className='bg-white text-black hover:bg-black hover:text-white duration-300 px-6 py-1 rounded-md'>
                        Login
                    </button>
                    <Link className='ms-auto mt-2 block text-blue-700 underline w-fit' to="/signup">Sign Up?</Link>
                </form></div>
        </div>
    )
}

export default Login