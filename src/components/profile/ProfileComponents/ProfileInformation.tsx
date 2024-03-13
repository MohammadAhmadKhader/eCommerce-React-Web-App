import { useContext } from 'react'
import Input from '../../shared/Input'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaChevronDown } from "react-icons/fa6";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { tlds } from '@hapi/tlds';
import { UserData } from '../../../types/types';

const schema = Joi.object({
  firstName: Joi.string().min(4).max(32).allow(""),
  lastName: Joi.string().min(4).max(32),
  email: Joi.string().email({ tlds: { allow: tlds } }).min(7).max(64),
  mobileNumber: Joi.string().min(7).max(20),
  // minimum is before 80 years from now and max is before 5 years from now
  birthDate: Joi.date().max(new Date(Date.now() - 157680000000)).min(new Date(Date.now() - 2522880000000)),
})

function ProfileInformation() {
  const { theme } = useContext(ThemeContext)

  const { register, handleSubmit, formState } = useForm<UserData>({
    mode: "onChange",
    resolver: joiResolver(schema),
  });
  const { errors, isValid, isDirty } = formState;
  console.log(isValid)
  console.log(errors, "ERRORS")


  const onSubmit: SubmitHandler<UserData> = (data) => {
    for (const key in data) {
      if (data[key as keyof UserData] == "") {
        delete data[key as keyof UserData]
      }
    }
  }

  return (
    <div>
      <div>
        <h3 className='text-2xl border-b pb-2' style={{
          borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        }}>
          Personal Information
        </h3>
      </div>

      <div>
        <div className='flex my-3 flex-col'>
          <div className='flex-shrink-0 sm:max-w-96 flex justify-center sm:justify-between flex-col sm:flex-row'>
            <div className='flex-shrink-0'>
              <img className='rounded-full m-auto mb-5 sm:m-0' width={"80px"} height={'80px'}
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1708290481~exp=1708291081~hmac=2b691806f30732ec151458d70d803fcdbb888db344b5bd9b2b30d749438857f5"
                alt="User Img" />
            </div>
            <div className='flex items-end gap-x-3.5 justify-center sm:justify-normal'>
              <button className='px-10 py-1 border h-fit duration-300 rounded-md
               text-white border-color-accent hover:text-color-accent hover:bg-transparent bg-color-accent'>
                Upload
              </button>
              <button className='px-10 py-1 border h-fit duration-300 rounded-md
               text-red-600 border-red-600 hover bg-transparent hover:text-white hover:bg-red-600'>
                Delete
              </button>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
              <div className='flex gap-x-5 flex-wrap sm:flex-nowrap'>
                <Input name="firstName" type="text" register={register} title="First Name"
                  id="firstName" placeholder='Joe' errors={errors} parentCustomClass={'w-full'} />
                <Input name="lastName" type="text" register={register} title="Last Name"
                  id="lastName" placeholder='Don' errors={errors} parentCustomClass={'w-full'} />
              </div>
              <Input name="email" type="email" register={register} title="Email" id="email" placeholder='Don@gmail.com' errors={errors} />
              <Input name="mobileNumber" type="text" register={register} title="Mobile Number" id="mobileNumber" placeholder='+09237 231 121' errors={errors} />
              <div className='relative w-56'>
                <Input name="birthDate" type='date' register={register} title="Date of birth" id="birthDate" errors={errors}
                  placeholder='' maxDate={new Date(Date.now() - 157680000000).toISOString().split("T")[0]}
                  minDate={new Date(Date.now() - 2522880000000).toISOString().split("T")[0]} />
                <FaChevronDown className='absolute right-3 top-10 select-none ' />
              </div>


              <button disabled={!isValid || !isDirty} type='submit' className='rounded-md px-8 py-1 bg-color-accent text-white
               duration-300 border border-color-accent hover:bg-transparent hover:text-color-accent
               disabled:opacity-60 disabled:hover:text-white disabled:hover:bg-color-accent
               '>

                Save Changes
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInformation