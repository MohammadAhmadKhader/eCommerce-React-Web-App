import { Dispatch, SetStateAction, useContext, useState } from 'react'
import EditButton from '../dashboardShared/EditButton'
import { toast } from 'react-toastify';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateBrandDto, UpdateCategoryDto } from '../../../types/types';
import useAxios from '../../../customHooks/useAxios';
import UploadImageInput from '../dashboardShared/UploadImageInput';
import Input from '../../../components/shared/Input';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { updateBrandSchema } from '../../../schemas/brandSchema';

export interface IEditBrand {
    brand:any;
    setIsEditModalOpen:Dispatch<SetStateAction<boolean>>
}

function EditBrand({ brand,setIsEditModalOpen } : IEditBrand) {
    const { register, handleSubmit, formState, reset, trigger, setValue, getValues } = useForm<UpdateBrandDto>({
        mode: "onChange",
        resolver: joiResolver(updateBrandSchema),
    });
    const { isSubmitting, isLoading, isValid, errors } = formState;
    const [filesNames,setFilesNames] = useState<string[]>([])
    const { userToken } = useContext(UserContext);
    const { PUT } = useAxios();


    const editBrand = async (brandId: string, userToken: string, formData: FormData) : Promise<number | undefined>=> {
        try {
            const response = await PUT(`/brands/${brandId}`, formData, userToken);
            if (response?.status === 200) {
                toast.success("Brand was deleted");
                reset();
                setIsEditModalOpen(false);
            }
            return response?.status
        } catch (error) {
            toast.error(error);
            console.log(error)
        }
    }
    const submitHandler: SubmitHandler<UpdateBrandDto> = async (submittedData) => {
        const formData = new FormData();
        if (getValues("brandLogo")) {
            formData.append("brandLogo", getValues("brandLogo"));
        }
        if (getValues("brandName")) {
            formData.append("brandName", getValues("brandName"));
        }
        await editBrand(brand?._id, userToken, formData);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='min-w-[600px]'>
            <div>
                <Input name='brandName' placeholder='brand name...' id='name'
                    register={register} title='Brand name' type='text' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                />
                <div style={{ marginBottom: "30px" }}>
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload category image' name="brandLogo"
                         style={{ width: "100%", marginBottom: "2px" }} showImageName={true} filesNames={filesNames} setFilesNames={setFilesNames} />
                </div>
            </div>
            <EditButton customWord='Edit Brand' mode='word' className='font-semibold w-full mt-2' disabled={(isSubmitting || isLoading || !isValid)} isLoading={isSubmitting || isLoading} />
        </form>
    )
}

export default EditBrand