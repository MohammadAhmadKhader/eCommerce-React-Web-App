import { useContext, useState } from 'react'
import UploadImageInput from '../dashboardShared/UploadImageInput'
import CreateButton from '../dashboardShared/CreateButton'
import Input from '../../../components/shared/Input'
import { joiResolver } from '@hookform/resolvers/joi';
import { createProductSchema } from '../../../schemas/productSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { CreateUserDto } from '../../../types/types';
import RadioGroupInput from '../dashboardShared/RadioGroupInput';
import { createUserSchema } from '../../../schemas/userSchemas';

function CreateUser() {
    const { register, handleSubmit, formState, reset, trigger, setValue, getValues } = useForm<CreateUserDto>({
        mode: "onChange",
        resolver: joiResolver(createUserSchema),
    });
    const { errors, isSubmitting, isLoading } = formState;
    const [filesNames, setFilesNames] = useState<string[]>([]);
    const [userRole, setUserRole] = useState<"user" | "admin">("user");

    const { POST } = useAxios();
    const { userToken } = useContext(UserContext);

    const submitHandler: SubmitHandler<CreateUserDto> = async (submittedData) => {
        try {
            const formData = new FormData();
            for (const key in submittedData) {
                let value = submittedData[key];
                if (typeof value === "number") {
                    value = (submittedData[key] as number).toString()
                }

                formData.append(key, value);
            }
            const { data } = await POST("/users/dashboard", formData, userToken);

            if (data?.message === "success") {
                toast.success("User was created");
                setFilesNames([]);
                reset()
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit(submitHandler)} className='max-w-[800px] w-full mb-40 border rounded-xl p-5 border-color-accent' style={{ borderColor: "rgba(29,155,240,0.3)" }}>
                <div>
                    <Input name='firstName' placeholder='firstName..' id='firstName'
                        register={register} title='FirstName' type='text' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <Input name='lastName' placeholder='lastName..' id='lastName'
                        register={register} title='LastName' type='text' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <Input name='email' placeholder='email..' id='email'
                        register={register} title='Email' type='email' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <Input name='password' placeholder='password..' id='password'
                        register={register} title='Password' type='password' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload user image' name="userImg"
                        setFilesNames={setFilesNames} filesNames={filesNames} showImageName={true} filesNamesClasses='block mt-1' />

                    <RadioGroupInput value={userRole} ariaLabelledby='user role' name='role' defaultValue={'user'}
                        onChange={(event, newValue) => {
                            setValue("role", newValue as "user" | "admin")
                            setUserRole(newValue as "user" | "admin")
                        }}
                        optionsArray={[{ id: 1, isChecked: true, value: "user", label: "user" }, { id: 2, isChecked: false, value: "admin", label: "admin" }]} />
                </div>

                <CreateButton className='my-2 w-full' disabled={isLoading || isSubmitting} type='submit'
                    isLoading={isSubmitting || isLoading} />
            </form>
        </div>
    )
}

export default CreateUser