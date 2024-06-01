import { useContext, useState } from 'react'
import UploadImageInput from '../dashboardShared/UploadImageInput'
import Input from '../../../components/shared/Input'
import { joiResolver } from '@hookform/resolvers/joi';
import { createProductSchema } from '../../../schemas/productSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { UpdateUserDto } from '../../../types/types';
import EditButton from '../dashboardShared/EditButton';

function EditUser() {
    const { register, handleSubmit, formState, reset, trigger, setValue } = useForm<UpdateUserDto>({
        mode: "onChange",
        resolver: joiResolver(createProductSchema),
    });
    const { errors, isSubmitting, isLoading } = formState;

    const { POST } = useAxios();
    const { userToken } = useContext(UserContext);
    const [filesNames,setFilesNames] = useState<string[]>([]);

    const submitHandler: SubmitHandler<UpdateUserDto> = async (submittedData) => {
        try {
            const formData = new FormData();
            for (const key in submittedData) {
                let value = submittedData[key];
                if (typeof value === "number") {
                    value = (submittedData[key] as number).toString()
                }

                formData.append(key, value);
            }

            const { data } = await POST("/dashboard/users", formData, userToken);

            if (data?.message === "success") {
                toast.success("User was created");
                reset()
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }
    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(submitHandler)} className='min-w-[800px] w-full mb-40 border rounded-xl p-5 border-color-accent' style={{ borderColor: "rgba(29,155,240,0.3)" }}>
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
                        register={register} title='Password' type='email' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload user image' name="image"
                     filesNames={filesNames} setFilesNames={setFilesNames}/>
                </div>

                <EditButton mode='both' customWord='Edit User' className='my-2 py-1.5 w-full font-semibold tracking-wide' disabled={false} isLoading={isSubmitting || isLoading} />
            </form>
        </div>
    )
}

export default EditUser