import { joiResolver } from '@hookform/resolvers/joi';
import  { useContext, useState } from 'react'
import { SubmitHandler,  useForm } from 'react-hook-form';
import { CreateBrandDto } from '../../../types/types';
import CreateButton from '../dashboardShared/CreateButton';
import Input from '../../../components/shared/Input';
import UploadImageInput from '../dashboardShared/UploadImageInput';
import { toast } from 'react-toastify';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { createBrandSchema } from '../../../schemas/brandSchema';

function CreateBrand() {
    const { register, handleSubmit, formState, reset, trigger, setValue, getValues } = useForm<CreateBrandDto>({
        mode: "onChange",
        resolver: joiResolver(createBrandSchema),
    });
    const { errors,isLoading,isSubmitting } = formState;
    const { POST } = useAxios();
    const { userToken } = useContext(UserContext);
    const [filesNames,setFilesNames] = useState<string[]>([]);

    const submitHandler: SubmitHandler<any> = async (submittedData) => {
        try {
            const formData = new FormData();
            formData.append("brandLogo", getValues("brandLogo"));
            formData.append("brandName", getValues("brandName"));
            
            const {data} = await POST("/brands",formData,userToken);

            if (data?.message === "success") {
                toast.success("Brand was created");
                setFilesNames([])
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
                    <Input name='brandName' placeholder='brand name..' id='name'
                        register={register} title='Brand name' type='text' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload brand image' name="brandLogo"
                     filesNames={filesNames} setFilesNames={setFilesNames} showImageName={true} />
                </div>

                <CreateButton className='my-2 w-full' disabled={false} type='submit' isLoading={isSubmitting || isLoading}/>
            </form>
        </div>
    )
}

export default CreateBrand