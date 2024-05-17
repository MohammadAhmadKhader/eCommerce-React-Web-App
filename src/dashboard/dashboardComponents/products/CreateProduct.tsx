import { useContext, useEffect, useState } from 'react'
import UploadImageInput from '../dashboardShared/UploadImageInput'
import CreateButton from '../dashboardShared/CreateButton'
import Input from '../../../components/shared/Input'
import { joiResolver } from '@hookform/resolvers/joi';
import { createProductSchema } from '../../../schemas/productSchema';
import { CreateProductDto } from '../../../types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider';
import SelectInput from '../dashboardShared/SelectInput';

function CreateProduct() {
    const { register, handleSubmit, formState, reset, trigger, setValue } = useForm<CreateProductDto>({
        mode: "onChange",
        resolver: joiResolver(createProductSchema),
    });
    const { errors, isSubmitting, isLoading } = formState;

    const { POST } = useAxios();
    const { userToken } = useContext(UserContext);
    const [filesNames, setFilesNames] = useState<string[]>([]);
    const { categories, brands, getBrands } = useContext(GlobalCachingContext);

    const submitHandler: SubmitHandler<CreateProductDto> = async (submittedData) => {
        try {
            const formData = new FormData();
            for (const key in submittedData) {
                let value = submittedData[key];
                if (typeof value === "number") {
                    value = (submittedData[key] as number).toString()
                }

                formData.append(key, value);
            }

            const { data } = await POST("/products", formData, userToken);
            if (data?.message === "success") {
                toast.success("Product was created");
                setFilesNames([]);
                reset();
                setValue("image", undefined);
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }
    useEffect(() => {
        getBrands();
    }, [])

    return (
        <div className='min-h-screen flex justify-center items-center px-1 my-3 '>
            <form onSubmit={handleSubmit(submitHandler)} className='max-w-[800px] w-full mb-40 border rounded-xl p-5 border-color-accent' style={{ borderColor: "rgba(29,155,240,0.3)" }}>
                <div>
                    <Input name='name' placeholder='product name...' id='name'
                        register={register} title='Product name :' type='text' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <Input name='price' placeholder='price...' id='price'
                        register={register} title='Price :' type='number' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <Input name='finalPrice' placeholder='Final price...' id='finalPrice'
                        register={register} title='Final price :' type='number' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />

                    <Input name='offer' placeholder='offer..' id='offer'
                        register={register} title='Offer :' type='number' errors={errors}
                        trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    />
                    <div className='flex flex-col'>
                        <label htmlFor="description">Description :</label>
                        <textarea {...register("description")} className={`rounded-md py-1 mb-1 mt-1 bg-transparent border px-2 resize-none`}
                            name="description" id="description" rows={7} placeholder='description...' />
                    </div>
                    <SelectInput optionValue={"_id"} optionName={"name"} optionsArray={categories} className='mt-2'
                        placeholder='Select category...'
                        width={"100%"} handleChange={(e, value) => { setValue("categoryId", value) }} />

                    <SelectInput optionValue={"name"} optionName={"name"} optionsArray={brands} className='my-3'
                        placeholder='Select brand...'
                        width={"100%"} handleChange={(e, value) => { setValue("brand", value) }} />

                    <div className='mb-5'>
                        <UploadImageInput reactFormHookSetValue={setValue} text='Upload product image'
                            name="image" showImageName={true} className='w-full pb-10' filesNames={filesNames} setFilesNames={setFilesNames} />
                    </div>
                </div>

                <CreateButton className='my-2 w-full' disabled={isSubmitting || isLoading}
                    type='submit' isLoading={isSubmitting || isLoading} />
            </form>
        </div>
    )
}

export default CreateProduct