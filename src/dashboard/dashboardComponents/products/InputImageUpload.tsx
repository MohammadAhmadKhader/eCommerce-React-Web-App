import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { Tooltip, styled } from '@mui/joy';
import { Dispatch, FormEvent, SetStateAction } from 'react';

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

interface IInputImageUpload {
    image: File | null;
    inputImageValue: string;
    setImage: Dispatch<SetStateAction<any>>;
    setInputImageValue: Dispatch<SetStateAction<string>>;
}
const handleUpload = (e: FormEvent, image: any) => {
    try {
        const formData = new FormData();
        if (image) {
            formData.append("image", image)
        } else {
            throw new Error("Image does not exist")
        }
    } catch (error) {
        console.log(error)
    }

}



export default function InputImageUpload({ image, setImage, inputImageValue, setInputImageValue }: IInputImageUpload) {
    return (
        <form encType='multipart/form-data' className='flex flex-col gap-y-2' onSubmit={(e) => { handleUpload(e, image) }}>
            <Button
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
                <VisuallyHiddenInput value={inputImageValue} type="file" name='image' onChange={(e: any) => {
                    const reader = new FileReader();
                    setInputImageValue(e?.target?.value);

                    reader.addEventListener("loadend", (file) => {
                        setImage((file.target.result))

                    });
                    reader.readAsDataURL(e.target.files[0]);
                }}
                />
            </Button>
            <Tooltip title={(image || inputImageValue) ? undefined : "Upload image"}>
                <button type='submit'
                    className='bg-amber-500 rounded-md hover:bg-amber-600 hover:disabled:bg-amber-500 disabled:opacity-75 duration-300 py-1 text-base tracking-wide font-semibold text-white'
                    disabled={(image || inputImageValue) ? false : true}
                >
                    Submit
                </button>
            </Tooltip>
        </form>
    );
}