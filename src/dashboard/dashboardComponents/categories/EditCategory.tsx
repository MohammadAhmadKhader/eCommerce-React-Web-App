import { Dispatch, SetStateAction, useContext } from 'react'
import EditButton from '../dashboardShared/EditButton'
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateCategoryDto } from '../../../types/types';
import { updateCategorySchema } from '../../../schemas/categorySchema';
import useAxios from '../../../customHooks/useAxios';
import UploadImageInput from '../dashboardShared/UploadImageInput';
import Input from '../../../components/shared/Input';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';

export interface IEditCategory {
    category:any;
    setIsEditModelOpen:Dispatch<SetStateAction<boolean>>
}

function EditCategory({ category,setIsEditModelOpen } : IEditCategory) {
    const { register, handleSubmit, formState, reset, trigger, setValue, getValues } = useForm<UpdateCategoryDto>({
        mode: "onChange",
        resolver: joiResolver(updateCategorySchema),
    });
    const { isSubmitting, isLoading, isValid, errors } = formState
    const { userToken } = useContext(UserContext);
    const { PUT } = useAxios();


    const editCategory = async (categoryId: string, userToken: string, formData: FormData) : Promise<number | undefined>=> {
        try {
            const response = await PUT(`/categories/${categoryId}`, formData, userToken);
            if (response?.status === 200) {
                toast.success("Category was edited");
                reset();
                setIsEditModelOpen(false);
            }
            return response?.status
        } catch (error) {
            toast.error(error);
            console.log(error)
        }
    }
    const submitHandler: SubmitHandler<UpdateCategoryDto> = async (submittedData) => {
        const formData = new FormData();
        if (getValues("image")) {
            formData.append("image", getValues("image"));
        }
        if (getValues("name")) {
            formData.append("name", getValues("name"));
        }
        await editCategory(category?._id, userToken, formData);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='min-w-[600px]'>
            <div style={{}}>
                <Input name='name' placeholder='category name...' id='name'
                    register={register} title='Category name' type='text' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                />
                <div style={{ marginBottom: "30px" }}>
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload category image'
                        name="image" style={{ width: "100%", marginBottom: "2px" }} showImageName={true} />
                </div>
            </div>
            <EditButton customWord='Edit Category' mode='word' className='font-semibold w-full mt-2' disabled={(isSubmitting || isLoading || !isValid)} isLoading={isSubmitting || isLoading} />
        </form>
    )
}

export default EditCategory