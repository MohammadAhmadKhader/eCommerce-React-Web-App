import React, { useContext } from 'react'
import Input from '../shared/Input'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { UserSigUpDataType } from '../../types/types';
import useAxios from '../customHooks/useAxios';
import { toast } from 'react-toastify';
import { UserContext } from '../features/UserFeature/UserProvider';

const schema = yup
  .object({
    email: yup.string().email().min(5, "Minimum characters allowed is 5").max(64, "Max characters allowed is 64").required(),
    firstName: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    lastName: yup.string().min(4, "Minimum characters allowed is 4").max(32, "Max characters allowed is 32").required(),
    password: yup.string().min(6, "You must have at least 6 characters").max(24, "Max allowed is 24").required(),
  })
  .required()

function SignUp() {
  const { theme } = useContext(ThemeContext)
  
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSigUpDataType>({
    resolver: yupResolver(schema)
  });
  const {POST} = useAxios()
  const navigate = useNavigate()
  const {setUserData,setUserToken} = useContext(UserContext)


  const onSubmit: SubmitHandler<UserSigUpDataType> = async(submittedData) => {
    try{
      const {data} = await POST("/users/signup",{
        firstName:submittedData.firstName,
        lastName:submittedData.lastName,
        email:submittedData.email,
        password:submittedData.password
      })

      if (data["message"] == "success") {
        setUserToken(data.token);
        setUserData(data.user);
        localStorage.setItem("userTokenGeekOut", data.token)
        toast.success("You have created account successfully!")
        navigate("/")
      }

    } catch (error) {
      console.error(error)
      toast.error("Something Went Wrong Please Try Again Later!")
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
      type: "text",
      title: "Name:",
      placeholder: "name",
      id: "username",
      name: "username",
    },
    {
      type: "password",
      title: "Password:",
      placeholder: "password",
      id: "password",
      name: "password",
    },
  ]

  return (
    <div className=''>
      <div className='flex justify-center items-center' style={{ minHeight: "800px" }}>

        <form onSubmit={handleSubmit(onSubmit)} onClick={() => console.log(errors)}
          className='-translate-y-16 border-solid border w-9/12 max-w-xl mx-auto p-4 rounded-2xl'
          style={{
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            boxShadow: theme == "dark" ? "var(--dark--boxShadow)" : "var(--light--boxShadow)"
          }}
        >
          <h2 className='text-2xl font-semibold mb-5'>Create Account Now</h2>
          <div>
            <div className='flex justify-between items-center gap-x-5 flex-col md:flex-row '>
              <Input register={register} type={"text"} title={"First Name:"} id={"firstName"} placeholder={"first name"}
                trigger={trigger} name={"firstName"} errors={errors} parentCustomClass='w-full min-h-20 [margin-bottom:0.5rem;]' />

              <Input register={register} type={"text"} title={"Last Name"} id={"lastName"} placeholder={"last name"}
                trigger={trigger} name={"lastName"} errors={errors} parentCustomClass='w-full min-h-20 [margin-bottom:0.5rem;]' />
            </div>

            <Input register={register} type={"email"} title={"Email"} id={"email"} placeholder={"email"}
              trigger={trigger} name={"email"} errors={errors} parentCustomClass=' min-h-20 [margin-bottom:0.5rem;]' />

            <Input register={register} type={"password"} title={"Password"} id={"password"} placeholder={"password"}
              trigger={trigger} name={"password"} errors={errors} parentCustomClass=' min-h-20 [margin-bottom:0.75rem;]' />
          </div>
          <button className='bg-white text-black hover:bg-black hover:text-white duration-500 px-7 py-1 rounded-md border'
            style={{
              borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}
            type='submit'
          >
            Sign up
          </button>

          <Link className='ms-auto mt-2 block text-blue-700 underline w-fit' to="/login">Sign In?</Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp