import { CSSProperties, SyntheticEvent, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { makeAspectCrop, type Crop, centerCrop, convertToPixelCrop, } from 'react-image-crop'
import { convertBase64ToBlob, setCanvasPreview } from './helperFunctions';

// TODO refactor this component into re-usable components and fit with multiple files input
export interface IProductImageInput<T> {
    text: string;
    type?: "accent";
    name?: string;
    errors: FieldErrors<T>;
    setError: UseFormSetError<T>;
    clearErrors: UseFormClearErrors<T>;
    reactFormHookSetValue?: UseFormSetValue<T>;
    className?: string;
    style?: CSSProperties;
}
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
const aspectRatio = 1.5;
const minDimensions = 150;
const maxUploadedImageHeight = 600;
const maxCanvasWidth = 350;

function UploadProductImageInput(
    { text, type = "accent", reactFormHookSetValue, setError, errors, name = "image", className = "", style = {}, clearErrors }:
        IProductImageInput<any>) {

    const imgRef = useRef<HTMLImageElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [previewImage, setPreviewImage] = useState<null | string>(null);
    const [crop, setCrop] = useState<Crop>()
    const [imageType, setImageType] = useState<null | string>(null);

    const fileReader = new FileReader();

    fileReader.onloadend = (file) => {
        const imageElement = new Image();
        const imageBase64Url = file.target.result as string;
        imageElement.src = imageBase64Url;

        // Validate the image before showing it
        imageElement.onload = (e) => {
            if (errors[name]) {
                clearErrors([name]);
            }
            const { naturalHeight, naturalWidth } = (e as unknown as SyntheticEvent<HTMLImageElement>).currentTarget;
            if (naturalHeight < minDimensions || naturalWidth < minDimensions) {
                setError(name, { message: `Image must be at least ${minDimensions} x ${minDimensions} pixels.` });
                setPreviewImage(null);
                return;
            }
        }

        setPreviewImage(imageBase64Url);
    }

    function onImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
        const { width, height } = e.currentTarget;
        const cropWidthInPercentage = (minDimensions / width) * 100;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercentage,
            }, aspectRatio, width, height)

        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop);
    }

    return (
        <>
            <Button
                className={`${className}`}
                component="label"
                role={"img"}
                tabIndex={-1}
                sx={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--accent-color)",
                    color: "var(--accent-color)",
                    transition: "all 300ms",
                    ":hover,:active": {
                        backgroundColor: "var(--accent-color)",
                        color: "white"
                    },
                    ...style
                }}
                startDecorator={
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            color={`${type === "accent" ? "white" : ""}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                    </SvgIcon>
                }
            >
                {text}
                <VisuallyHiddenInput type="file"
                    onChange={(e) => {
                        if (reactFormHookSetValue) {
                            fileReader.readAsDataURL(e?.target?.files[0])
                            reactFormHookSetValue(name, e?.target?.files[0]);
                        }
                        setImageType(e.target.files[0].type)
                    }}
                />

            </Button>

            {previewImage &&
                <div className='flex flex-col mt-3'>
                    <ReactCrop
                        crop={crop}
                        className='mx-auto'
                        aspect={1 / aspectRatio}
                        maxHeight={maxUploadedImageHeight}
                        minWidth={minDimensions}
                        style={{
                            maxWidth: 450,
                        }}
                        onChange={(pixelCrop, percentageCrop) => {
                            setCrop(percentageCrop)
                        }}
                    >
                        <img src={previewImage} alt='preview product'
                            className='object-contain'
                            onLoad={onImageLoad} ref={imgRef}
                        />
                    </ReactCrop>
                    <button
                        type='button'
                        className='bg-color-accent hover:bg-sky-600 text-white font-semibold text-xs px-4 py-2 rounded-2xl w-fit mx-auto my-2'
                        onClick={() => {
                            if (imageType) {
                                setCanvasPreview(
                                    imgRef.current,
                                    previewCanvasRef.current,
                                    convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
                                )
                                const canvasImageUrl = previewCanvasRef.current?.toDataURL();
                                const blob = convertBase64ToBlob(canvasImageUrl, imageType);
                                reactFormHookSetValue(name, blob);
                            } else {
                                setError(name, { message: "image type is unknown" });
                            }
                        }}
                    >
                        Crop Image
                    </button>
                    {crop &&
                        <canvas
                            ref={previewCanvasRef}
                            className='mt-4 mx-auto'
                            style={{
                                border: "1px solid white",
                                width: maxCanvasWidth,
                                height: maxCanvasWidth * aspectRatio
                            }}
                        />}
                </div>
            }

            {errors && errors[name] && <span className='text-red-400 text-xs'>{(errors as any)[name].message}</span>}

        </>
    )
}

export default UploadProductImageInput