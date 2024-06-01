import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { Tooltip, styled } from '@mui/joy';
import {  FormEvent, useContext,useState } from 'react';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { toast } from 'react-toastify';
import ButtonLoader from '../dashboardShared/ButtonLoader';
import { IInputImageUpload, IPayloadUploadImage } from '../../../types/types';
import { useSearchParams } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputImageUpload({ 
    previewImage, setPreviewImage, inputValue, setInputValue, 
    fileImage, setFileImage, productId, imageId,getAllProducts }: IInputImageUpload) {
    const [searchParams,setSearchParams]= useSearchParams()
    const { PATCH } = useAxios();
    const { userToken } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleUpload = async (event: FormEvent, userToken: string,
        payload: IPayloadUploadImage = { productId: undefined, imageId: undefined, fileImage }) => {
        try {

            event.preventDefault();
            setIsLoading(true)
            const formData = new FormData();
            if (fileImage) {
                formData.append("image", fileImage);
                formData.append("imageId", payload.imageId);
            } else {
                throw new Error("Image does not exist")
            }
            const { data } = await PATCH(`/products/image/${payload.productId}`, formData, userToken);
            if (data.message === "success") {
                toast.success("Product image was changed");
                setPreviewImage(null);
                setInputValue(undefined);
                getAllProducts(searchParams.get("page"),searchParams.get("limit"))
            }
        } catch (error) {
            toast.error(error);
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    

    return (
        <form encType='multipart/form-data' className='flex flex-col gap-y-2'
            onSubmit={(e) => {
                handleUpload(e, userToken, { fileImage: fileImage, imageId: imageId, productId: productId });
            }}>
            <Button
                disabled={isLoading}
                component="label"
                role={'img'}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                className='duration-500 border-color-accent'
                startDecorator={
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"

                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                color="white"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                    </SvgIcon>
                }
                sx={{
                    color: "white",
                    backgroundColor: "var(--accent-color)",
                    borderColor: "var(--accent-color)",
                    opacity: 1,
                    ':hover,:active': {
                        backgroundColor: "var(--accent-color)",
                        opacity: 0.8
                    },
                }}
            >
                Change Image
                <VisuallyHiddenInput value={inputValue} type="file" name='image' onChange={(e: any) => {
                    const reader = new FileReader();
                    setInputValue(e?.target?.value); // name includes fakePath//imageName
                    setFileImage(e.target.files[0]);

                    reader.onloadend = (file) => {
                        setPreviewImage(file?.target?.result);

                    };
                    reader.readAsDataURL(e.target.files[0]);
                }}
                />
            </Button>
            <Tooltip title={(previewImage || inputValue) ? undefined : "Upload image"}>
                <button type='submit'
                    className='bg-amber-500 rounded-md hover:bg-amber-600 hover:disabled:bg-amber-500 disabled:opacity-75 duration-300 py-1 text-base tracking-wide font-semibold text-white'
                    disabled={(previewImage || inputValue) ? false : true}
                >
                    <span className='flex items-center justify-center gap-x-1.5'>
                        <span>Submit</span>
                        {isLoading && <ButtonLoader />}
                    </span>
                </button>
            </Tooltip>
        </form>
    );
}