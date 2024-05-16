import { joiResolver } from '@hookform/resolvers/joi';
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';
import { CreateCategoryDto } from '../../../types/types';
import { createCategorySchema } from '../../../schemas/categorySchema';
import CreateButton from '../dashboardShared/CreateButton';
import Input from '../../../components/shared/Input';
import UploadImageInput from '../dashboardShared/UploadImageInput';
import { toast } from 'react-toastify';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';

function CreateCategory() {
    const { register, handleSubmit, formState, reset, trigger, setValue, getValues } = useForm<CreateCategoryDto>({
        mode: "onChange",
        resolver: joiResolver(createCategorySchema),
    });
    const { errors, isSubmitting, isLoading } = formState;

    const { POST } = useAxios();
    const { userToken } = useContext(UserContext);
    const [filesNames, setFilesNames] = useState<string[]>([]);

    const submitHandler: SubmitHandler<any> = async (submittedData) => {
        try {
            const formData = new FormData();
            formData.append("image", getValues("image"));
            formData.append("name", getValues("name"));

            const { data } = await POST("/categories", formData, userToken);

            if (data?.message === "success") {
                toast.success("Category was created");
                setFilesNames([]);
                reset();
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
                    <Input name='name' placeholder='category name..' id='name'
                        register={register} title='Category name' type='text' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload category image' name="image"
                     filesNames={filesNames} setFilesNames={setFilesNames} showImageName={true} filesNamesClasses='block' />
                </div>

                <CreateButton className='my-2 w-full' disabled={false} type='submit' isLoading={isSubmitting || isLoading} />
            </form>
        </div>
    )
}

export default CreateCategory