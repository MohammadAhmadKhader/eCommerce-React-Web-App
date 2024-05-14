import React, { useContext, useEffect, useState } from 'react'
import { IProduct } from '../../../types/types'
import EditButton from '../dashboardShared/EditButton';
import DeleteButton from '../dashboardShared/DeleteButton';
import TableProductsPriceComponent from './TableProductsPriceComponent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlobalCachingContext } from '../../../components/features/GlobalCachingContext/GlobalCachingProvider';
import { FaChevronUp } from 'react-icons/fa6';
import InputImageUpload from './InputImageUpload';
import ProductImage from './ProductImage';

export interface IProductTableData {
    product: IProduct;
    count: number;
    index: number;
}

function ProductsTableData({ product, count, index }: IProductTableData) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsNumber, setItemsNumber] = useState(0);
    const { categories } = useContext(GlobalCachingContext);
    const [categoriesMapper, setCategoriesMapper] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        setItemsNumber((Number(searchParams.get("page") || 1) * Number(searchParams.get("limit") || 9) - Number(searchParams.get("limit") || 9)))
        categories?.forEach((category) => {
            categoriesMapper[category?._id] = category?.name;
        });

    }, [count, searchParams, categories]);
    return (
        <React.Fragment>
            <tr key={product?._id}>
                <td style={{ textAlign: "center" }}>
                    <button className='rounded-md flex justify-center items-center bg-color-accent duration-300 hover:bg-sky-800 p-1'
                        onClick={() => setIsOpen((prevState) => !prevState)}
                    >
                        <FaChevronUp size={12} className={`duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                </td>
                <td className='text-center text-[15px] tracking-wide font-semibold'>#{itemsNumber + index + 1}</td>
                <td className='text-[15px] tracking-wide font-semibold '>
                    <h4 className='line-clamp-2'>
                        {product?.name}
                    </h4>
                </td>
                <td>
                    <TableProductsPriceComponent product={product} />
                </td>
                <td className='text-center'>{product?.quantity}</td>
                <td className='text-center'>{Number(product?.avgRating).toFixed(2)} / 5</td>
                <td>
                    <div className='flex flex-col'>
                        <h4 className='font-semibold'>Brand : {product?.brand}</h4>
                        <h4 className='font-semibold'>Category : {categoriesMapper[product?.categoryId] || "N/F"}</h4>
                    </div>
                </td>
                <td>
                    <div className='flex gap-x-2 justify-center items-center tracking-wide font-semibold'>
                        <button className='px-2 py-1 rounded-md border border-color-accent bg-color-accent duration-500 hover:bg-sky-800 hover:border-sky-800 text-white'
                            onClick={() => {
                                navigate(`/products/${product?._id}?page=1&limit=9`)
                            }}
                        >
                            View
                        </button>
                        <EditButton mode='both' onClick={() => { console.log("Clicked on Edit") }} />
                        <DeleteButton mode='both' onClick={() => { console.log("Clicked on Delete") }} />
                    </div>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={8}>
                    {isOpen && (
                        <div className='my-3 w-full flex-col mx-2'>
                            <h4 className='text-center text-lg font-semibold'>{product?.name} images</h4>
                            <div className='grid grid-cols-12 gap-x-2 rounded-lg'>
                                {product.images.map((imageObj) => {
                                    return (
                                        <ProductImage imageObj={imageObj} product={product} key={imageObj?._id} />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </td>
            </tr>
        </React.Fragment>
    )
}

export default ProductsTableData