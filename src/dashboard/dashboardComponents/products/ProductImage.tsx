import { useState } from 'react';
import { IProduct, ProductImages } from '../../../types/types'
import InputImageUpload from './InputImageUpload'

function ProductImage({ product, imageObj ,getAllProducts}: { product: IProduct, imageObj: ProductImages,getAllProducts:(page:string,limit:string)=>any }) {
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>(null);
    const [isImageLoading,setIsImageLoaded] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [fileImage,setFileImage] = useState<File | null>(null);
    return (
        <div className='flex flex-col col-span-2'>
            <div key={imageObj?._id} className={`flex items-center justify-center rounded-lg my-auto relative ${previewImage ? "group" : ""}`}>
                <img className='rounded-lg bg-white blur-sm duration-300' src={`${isImageLoading ? (previewImage ? previewImage : imageObj?.imageUrl) :imageObj?.thumbnailUrl}`} alt={`${product?.name}`}
                    onLoad={(e) => {
                        const img = e?.currentTarget;
                        if (img) {
                            img.classList.remove("blur-sm");
                            setIsImageLoaded(true);
                        }
                    }}

                />

                <div className='absolute w-full h-full bg-opacity-45 bg-black hidden group-hover:block'>
                    <button className='bg-amber-500 px-5 py-1 font-semibold tracking-wide rounded-md duration-300 absolute left-1/2 top-1/2 -translate-x-1/2'
                        onClick={() => {
                            setPreviewImage(null);
                            setInputValue("");
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className='text-center w-full mt-auto'>
                <div className='mt-2'>
                    <InputImageUpload previewImage={previewImage} setPreviewImage={setPreviewImage} productId={product?._id} imageId={imageObj?._id}
                     inputValue={inputValue} setInputValue={setInputValue} fileImage={fileImage} setFileImage={setFileImage} getAllProducts={getAllProducts}/>
                </div>
            </div>
        </div>
    )
}

export default ProductImage