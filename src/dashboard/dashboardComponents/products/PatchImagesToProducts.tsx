import { toast } from "react-toastify";
import EditButton from "../dashboardShared/EditButton";
import UploadImageInput from "../dashboardShared/UploadImageInput";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import useAxios from "../../../customHooks/useAxios";
import { UserContext } from "../../../components/features/UserFeature/UserProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../../../types/types";

export interface IPatchImagesToProduct {
    images: FileList[]
}

export interface IPatchImagesToProductProps {
    setIsPatchImagesModelOpen: Dispatch<SetStateAction<boolean>>;
    product: IProduct;
}

function PatchImagesToProduct({ setIsPatchImagesModelOpen, product }: IPatchImagesToProductProps) {
    const { handleSubmit, formState, reset, setValue } = useForm<IPatchImagesToProduct>({
        mode: "onChange",
    });
    const { isSubmitting, isLoading } = formState;
    const { PATCH } = useAxios();
    const { userToken } = useContext(UserContext);
    const [filesNames, setFilesNames] = useState<string[]>([]);

    const validateArrayOfImageFiles = (formData : FormData,name:string)=>{
        const maxFiles = 9;
        if(formData.getAll(name) && formData.getAll(name).length > maxFiles){
            throw new Error("Max 9 images allowed");
        }

        let countOfCorrectInstances = 0;
        formData.getAll("images")?.forEach((file) => {
            if (file instanceof File) {
                countOfCorrectInstances++;
            }
        })

        if (countOfCorrectInstances !== formData.getAll("images").length && formData.getAll("images")[0]! instanceof File) {
            throw new Error("Invalid image");
        }
    }

    const submitHandler: SubmitHandler<IPatchImagesToProduct> = async (submittedData) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < submittedData?.images?.length; i++) {
                formData.append("images", submittedData?.images[i] as any);
            }
            // Will throw an error if incorrect
            validateArrayOfImageFiles(formData,"images");

            const { data } = await PATCH(`/products/addImages/${product?._id}`, formData, userToken);
            if (data?.message === "success") {
                toast.success("Images were added");
                setFilesNames([]);
                reset();
                setValue("images", undefined);
                setIsPatchImagesModelOpen(false)
            }
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(submitHandler)} className='min-w-[500px] w-full my-14 border rounded-xl p-5 border-color-accent' style={{ borderColor: "rgba(29,155,240,0.3)" }}>

                <div className='mb-5'>
                    <UploadImageInput reactFormHookSetValue={setValue} text='Upload product images' multiple={true}
                        filesNamesClasses="block my-0.5 text-green-500"
                        filesNamesParentClasses="w-full block my-2 p-3 rounded-md bg-gray-600 border-green-600 border"
                        name="images" showImageName={true} className='w-full pb-10' filesNames={filesNames} setFilesNames={setFilesNames} />
                </div>

                <EditButton className='my-2 w-full bg-purple-500 font-semibold hover:bg-purple-700' disabled={isSubmitting || isLoading}
                    isLoading={isSubmitting || isLoading} customWord="Add Images" mode="word" />
            </form>
        </div>
    )
}

export default PatchImagesToProduct