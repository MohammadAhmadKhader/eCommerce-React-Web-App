import { joiResolver } from '@hookform/resolvers/joi';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import useAxios from '../../../customHooks/useAxios';
import { IProduct, UpdateProductDto } from '../../../types/types';
import { updateProductSchema } from '../../../schemas/productSchema';
import UploadImageInput from '../dashboardShared/UploadImageInput';
import EditButton from '../dashboardShared/EditButton';
import Input from '../../../components/shared/Input';
import { toast } from 'react-toastify';
import SelectInput from '../dashboardShared/SelectInput';
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider';

export interface IEditProduct {
    product: IProduct;
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
}

function EditProduct({ setIsEditModalOpen, product }: IEditProduct) {
    const { register, handleSubmit, formState, reset, trigger, setValue, watch, getValues } = useForm<UpdateProductDto>({
        mode: "onChange",
        resolver: joiResolver(updateProductSchema),
    });
    const { isSubmitting, isLoading, errors, isDirty } = formState
    const { userToken } = useContext(UserContext);
    const { categories, brands, getBrands } = useContext(GlobalCachingContext);
    const { PATCH } = useAxios();
    const [filesNames, setFilesNames] = useState<string[]>([]);
    const [isDefaultValues, setIsDefaultValues] = useState<boolean>(true);

    useEffect(() => {
        setValue("brand", product?.brand);
        if (brands.length === 0) {
            getBrands();
        }
    }, [])

    useEffect(() => {

        const subscription = watch((values) => {
            // TODO send description to it be compared here (separated end point in backend for dashboard)
            if (values?.brand == product?.brand && values?.categoryId == product?.categoryId && values?.price == product?.price
                && values?.finalPrice == product?.finalPrice && values?.name == product?.name && values.quantity == product?.quantity
                && Number(values?.offer) == Number(product?.offer)) {

                setIsDefaultValues(true);

            } else {
                console.log("false")
                setIsDefaultValues(false)
            }
        })

        return () => subscription.unsubscribe();
    }, [watch])

    const editProduct = async (productId: string, userToken: string, formData: FormData): Promise<number | undefined> => {
        try {
            const response = await PATCH(`/products/${productId}`, formData, userToken);
            if (response?.status === 200) {
                toast.success("Product was edited");
                reset();
                setIsEditModalOpen(false);
            }
            return response?.status
        } catch (error) {
            toast.error(error);
            console.log(error)
        }
    }
    const submitHandler: SubmitHandler<UpdateProductDto> = async (submittedData) => {
        const formData = new FormData();
        for (const key in submittedData) {
            let value = submittedData[key];
            if (typeof value === "number") {
                value = (submittedData[key] as number).toString()
            }

            if (value && product[key] != getValues(key as any)) {
                formData.append(key, value);
            }
        }

        await editProduct(product?._id, userToken, formData);
    }

    return (

        <form onSubmit={handleSubmit(submitHandler)} className='min-w-[800px] w-full my-5 border rounded-xl p-5 border-color-accent' style={{ borderColor: "rgba(29,155,240,0.3)" }}>
            <div>
                <Input name='name' placeholder='product name...' id='name'
                    register={register} title='Product name :' type='text' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    defaultValue={product?.name}
                />
                <Input name='price' placeholder='price...' id='price' precision={0.01}
                    register={register} title='Price :' type='number' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    defaultValue={product?.price}
                />
                <Input name='finalPrice' placeholder='Final price...' id='finalPrice' precision={0.01}
                    register={register} title='Final price :' type='number' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    defaultValue={product?.finalPrice}
                />

                <Input name='offer' placeholder='offer..' id='offer' precision={0.001}
                    register={register} title='Offer :' type='number' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    defaultValue={product?.offer}
                />
                <Input name='quantity' placeholder='quantity..' id='quantity'
                    register={register} title='Quantity :' type='number' errors={errors}
                    trigger={trigger} parentCustomClass='h-20' className='mt-2'
                    defaultValue={product?.quantity}
                />
                <div className='flex flex-col'>
                    <label htmlFor="description">Description :</label>
                    <textarea {...register("description")} className={`rounded-md py-1 mb-1 mt-1 bg-transparent border px-2 resize-none`}
                        name="description" id="description" rows={7} placeholder='description...'
                        defaultValue={product?.description} />
                </div>
                <SelectInput optionValue={"_id"} optionName={"name"} optionsArray={categories} className='mt-2'
                    placeholder='Select category...'
                    width={"100%"} handleChange={(e, value) => {
                        setValue("categoryId", value, { shouldDirty: true });
                        console.log(getValues("categoryId"));

                    }}
                    defaultValue={product?.categoryId}
                />

                <SelectInput optionValue={"name"} optionName={"name"} optionsArray={brands} className='my-3'
                    placeholder='Select brand...'
                    width={"100%"} handleChange={(e, value) => { setValue("brand", value, { shouldDirty: true }) }}
                    defaultValue={product?.brand}
                />

                <div className='mb-5'>
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload product image'
                        name="image" showImageName={true} className='w-full pb-10' filesNames={filesNames} setFilesNames={setFilesNames} />
                </div>
            </div>

            <EditButton className='my-2 w-full font-semibold tracking-wide' disabled={isDefaultValues || isSubmitting || isLoading}
                isLoading={isSubmitting || isLoading} mode="word" />
        </form>
    )
}

export default EditProduct