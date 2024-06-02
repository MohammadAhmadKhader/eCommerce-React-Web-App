import { InputHTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import Input from '../../shared/Input'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaChevronDown } from "react-icons/fa6";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserData } from '../../../types/types';
import { UserContext } from '../../features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import CircularLoader from '../../shared/CircularLoader';
import { useBlocker } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { userInformationSchema } from '../../../schemas/userSchemas';



function ProfileInformation() {
  const { theme } = useContext(ThemeContext)
  const { userData, userToken, isUserFetchDataLoading, getUserData } = useContext(UserContext)
  const [isDefaultValues, setIsDefaultValues] = useState(true);
  const { PUT } = useAxios()
  const { register, handleSubmit, formState, reset, watch, getValues, setValue } = useForm<UserData>({
    mode: "onChange",
    resolver: joiResolver(userInformationSchema),
  });
  const [fileReader, setFileReader] = useState<FileReader | null>(null)
  const { errors, isValid, isDirty, isSubmitting } = formState;
  const inputFileRef = useRef<null | HTMLInputElement>(null);
  const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"
  const [userImage, setUserImage] = useState(null);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDefaultValues === false && isValid &&
      currentLocation.pathname !== nextLocation.pathname

  );

  useEffect(() => {
    const subscription = watch((values) => {
      if (values?.birthDate as unknown as string == "" && values?.email == ""
        && values?.firstName == "" && values?.lastName == "" && values?.mobileNumber == "" &&
        (values?.userImg == userData?.userImg || values?.userImg === null)) {
          
        setIsDefaultValues(true)
      } else {
        setIsDefaultValues(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, inputFileRef.current?.value]);

  useEffect(() => {
    if (userImage instanceof File) {
      fileReader.readAsDataURL(userImage);

      fileReader.onloadend = (result) => {
        setUserImage(result?.target?.result)
      }
    }

  }, [userImage])

  useEffect(() => {
    const fileReader = new FileReader();
    setFileReader(fileReader);

  }, [])


  const userImageHandler = (uploadedImage: string, userImage: string, defaultImage: string, isDeleted) => {
    if (typeof uploadedImage === "string" && uploadedImage.substring(0, 4) === "data") {
      return uploadedImage;
    }
    if (userImage && !isDeleted) {
      return userImage
    }
    return defaultImage
  }
  const changeUserInfo: SubmitHandler<UserData> = async (submittedData) => {
    try {

      const formData = new FormData()
      if (userImage != null) {

        formData.append("userImg", userImage)
      }
      for (const key in submittedData) {
        if (submittedData[key as keyof UserData] != undefined && submittedData[key as keyof UserData] != "") {
          if (key !== "userImg") {
            formData.append(key, submittedData[key])
          } else {
            formData.append("userImg", getValues("userImg"))
          }
        }
      }
      const { data } = await PUT(`/users/userInformation`, formData, userToken)

      if (data.message == "success") {
        toast.success("Information has been changed successfully");
        reset();
        getUserData();
        setIsDefaultValues(true)
      }
    } catch (error) {
      toast.error("Something Went Wrong Please Try Again Later")
      console.log(error)
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

      <form onSubmit={handleSubmit(changeUserInfo)} encType='multipart/form-data'>
        {isUserFetchDataLoading ? <CircularLoader minHeight={500} /> : <div className='flex my-3 flex-col'>

          <div className='flex-shrink-0 sm:max-w-96 flex justify-center sm:justify-between flex-col sm:flex-row'>
            <div className='flex-shrink-0'>
              <img className='rounded-full m-auto mb-5 sm:m-0 object-cover w-[80px] h-[80px]'
                src={userImageHandler(userImage, userData.userImg, defaultUserImage, userImage === "deleteImg")}
                alt="User Img" onLoad={(e) => {
                  const Img = e.currentTarget
                  Img.classList.remove("blur-sm")
                }} />
            </div>
            <div className='flex flex-col justify-center'>
              <div className='flex items-end gap-x-3.5 justify-center sm:justify-normal'>


                <button className='px-10 py-1 border h-fit duration-300 rounded-md  font-semibold
               text-white border-color-accent hover:text-color-accent hover:bg-transparent bg-color-accent'
                  onClick={() => {
                    inputFileRef.current.click();
                  }} type='button'
                >
                  Upload
                  <input {...register("userImg")} accept="image/*" ref={inputFileRef} type='file' className='hidden'
                    id="userImg" onChange={(event) => {
                      const file = event.target.files[0];
                      setValue("userImg", file,{
                        shouldDirty:true
                      });
                      setUserImage(file);
                    }} />
                </button>

                <button className='px-10 py-1 border h-fit duration-300 rounded-md font-semibold
               text-red-600 border-red-600 hover bg-transparent hover:text-white hover:bg-red-600 
               hover:disabled:bg-inherit hover:disabled:text-red-600'
                  disabled={userImage === "deleteImg" ? true : false}
                  type='button' onClick={() => {
                    setUserImage("deleteImg");
                    setValue("userImg", "deleteImg",{
                      shouldDirty:true
                    });
                    inputFileRef.current.value = null;
                  }}
                >
                  Delete
                </button></div>
              {userImage && <span onClick={() => {
                setUserImage(null);
                inputFileRef.current.value = null;
                setValue("userImg", userData?.userImg,{
                  shouldDirty:true
                });
              }}
                className='mx-auto text-[10px] text-red-600 cursor-pointer'>
                click to reset
              </span>}
            </div>
          </div>


          <div>
            <div className='mt-5'>
              <div className='flex gap-x-5 flex-wrap sm:flex-nowrap'>
                <Input name="firstName" type="text" register={register} title="First Name"
                  id="firstName" placeholder={userData?.firstName} errors={errors} parentCustomClass={'w-full'} />
                <Input name="lastName" type="text" register={register} title="Last Name"
                  id="lastName" placeholder={userData?.lastName} errors={errors} parentCustomClass={'w-full'} />
              </div>
              <Input name="email" type="email" register={register} title="Email" id="email" placeholder={userData?.email} errors={errors} />
              <Input name="mobileNumber" type="text" register={register} title="Mobile Number" id="mobileNumber" placeholder={userData.mobileNumber || "Does not have a mobile number"} errors={errors} />
              <div className='relative w-56'>
                <Input name="birthDate" type='date' register={register} title="Date of birth" id="birthDate" errors={errors}
                  placeholder='' maxDate={new Date(Date.now() - 157680000000).toISOString().split("T")[0]}
                  minDate={new Date(Date.now() - 2522880000000).toISOString().split("T")[0]} />
                <FaChevronDown className='absolute right-3 top-10 select-none ' />
              </div>


              <button disabled={isDefaultValues || !isValid || !isDirty || isSubmitting} type='submit' className='rounded-md px-8 py-1 bg-color-accent text-white
               duration-300 border border-color-accent hover:bg-transparent hover:text-color-accent
               disabled:opacity-60 disabled:hover:text-white disabled:hover:bg-color-accent
               '>

                Save Changes
              </button>
            </div>

          </div>
        </div>}
      </form>

      {blocker.state === "blocked" && !isDefaultValues && isValid && (
        <ProfileModal blocker={blocker} />
      )}
    </div>
  )
}

export default ProfileInformation