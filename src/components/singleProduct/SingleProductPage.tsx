import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import "./singleProductsPage.css"
import SingleProductTabs from './SingleProductPageComponents/SingleProductTabs';
import ProductCarousel from './SingleProductPageComponents/SingleProductCarousel';
import { PiHandbagSimple } from "react-icons/pi";
import { VscHeart } from "react-icons/vsc";
import PriceComponent from '../products/ProductsComponents/PriceComponent';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import useAxios from '../customHooks/useAxios';
import ImageSkeleton from '../shared/LoadingSkeletons/ImageSkeleton';
import DetailsSkeleton from '../shared/LoadingSkeletons/DetailsSkeleton';
import { IProduct } from '../../types/types';
import Rating from '@mui/material/Rating';

function SingleProductPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<IProduct | object>({})
    const { GET, isLoading, setIsLoading } = useAxios()

    const productId = params.productId;
    if (!productId) {
        navigate("/")
    }
    const getProductData = async () => {
        const { data } = await GET(`/products/${productId}`)
        setProduct(data.product)
        console.log(data.product)
        setIsLoading(false)
    }

    useEffect(() => {
        getProductData()
    }, [])
    const { theme } = useContext(ThemeContext);
    const [quantity, setQuantity] = useState(1);

    return (
        <section className='px-3 md:px-5 single-product-page'>
            <div className='px-4 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
                <Link to="/">
                    Home
                </Link>
                <IoChevronForwardOutline />
                <Link to="/products">
                    Handbags
                </Link>
                <IoChevronForwardOutline />
                <Link to="/products/1">
                    Label
                </Link>
            </div>

            {isLoading ?
                <div className='grid grid-cols-12 p-0 sm:p-5 gap-x-3 gap-y-5'>
                    <div className='col-span-12 md:col-span-6 p-0 gap-x-3 gap-y-5'>
                        <ImageSkeleton customClass='min-h-[300px] md:min-h-[400px] rounded-xl max-w-[500px] m-auto' />
                    </div>

                    <div className='col-span-12 md:col-span-6'>
                        <DetailsSkeleton />

                    </div>
                </div> :
                <div className='grid grid-cols-12 p-0 sm:p-5 gap-x-3 gap-y-5'>
                    <div className='col-span-12 md:col-span-6 me-10'>
                        <ProductCarousel product={product as IProduct} />
                    </div>

                    <div className='col-span-12 md:col-span-6'>
                        <div className='flex flex-col gap-y-4'>
                            <div>
                                <h3 className='text-2xl font-semibold mb-4'>Name : {(product as IProduct).name}</h3>
                                <p>
                                    {(product as IProduct).description}
                                </p>
                                <div className='mt-4'>
                                    <h4 className='font-semibold opacity-90'>
                                        Brand: {(product as IProduct).brand}
                                    </h4>
                                    <h4 className='mt-1 font-semibold opacity-90'>
                                        Products available: {(product as IProduct).quantity} unit
                                    </h4>
                                    <h4 className='mt-1 font-semibold opacity-90'>
                                        Times Reviewed: {(product as IProduct).reviewsCount}
                                    </h4>
                                </div>
                            </div>
                            <div>
                                <Rating
                                    sx={{
                                        fontSize: "1.25rem !important",
                                        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                            color: 'var(--stars--color)',
                                        },
                                        color: 'var(--stars--color)'
                                    }}

                                    style={{ fontSize: 20 }}
                                    name="read-only" value={(product as IProduct).avgRating} precision={0.1} readOnly />
                            </div>
                            <div className='md:border-b md:pb-3'
                                style={{
                                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                                }}>
                                <PriceComponent price={(product as IProduct).price} finalPrice={(product as IProduct).finalPrice} offer={(product as IProduct).offer} customClassesOffer='gap-x-1.5 text-2xl' customClassesOfferFinalPrice='text-4xl font-semibold' />
                            </div>

                            <div className='flex flex-col gap-y-4'>

                                <div className='flex items-center gap-x-3'>
                                    <label htmlFor="quantity">Quantity : </label>
                                    <div className='flex items-center justify-center lg:justify-between border rounded-md'>
                                        <button className='size-fit disabled:opacity-65 disabled:hover:bg-transparent duration-500 py-0.5 border-r px-1 hover:bg-color-accent rounded-l-md'
                                            disabled={quantity == 1 ? true : false} onClick={() => {
                                                if (quantity >= 2) {
                                                    setQuantity(prev => prev - 1)
                                                }
                                            }}>
                                            <FiMinus size={18} />

                                        </button>
                                        <input id='quantity'
                                            className='w-16 px-3 text-sm outline-none rounded-md text-black bg-transparent mx-0.5 text-center'
                                            type="number" value={quantity} placeholder='quantity'
                                            style={{
                                                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                                                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                                            }}
                                        />
                                        <button className='size-fit duration-500 border-l py-0.5 px-1 hover:bg-color-accent rounded-r-md'
                                            onClick={() => {
                                                setQuantity(prev => prev + 1)
                                            }}>
                                            <FiPlus size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center gap-x-3 sm:gap-x-5'>
                                    <button className='text-sm font-semibold w-full py-2 rounded-md flex justify-center gap-x-1 sm:gap-x-4 items-center
                                 text-white bg-color-accent hover:bg-transparent hover:text-color-accent border-color-accent border-2 duration-300'>
                                        <span>
                                            <PiHandbagSimple size={22} />
                                        </span>
                                        <span>
                                            Add to Cart
                                        </span>

                                    </button>

                                    <button className='text-sm font-semibold w-full py-2 rounded-md flex justify-center gap-x-1 sm:gap-x-4 items-center text-color-accent bg-transparent
                                 border-2 border-color-accent hover:bg-color-accent hover:text-white duration-300'>
                                        <span>
                                            <VscHeart size={22} />
                                        </span>
                                        <span>
                                            Add to Wishlist
                                        </span>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className='my-5'>
                <SingleProductTabs product={product as IProduct} isLoading={isLoading}/>
            </div>

        </section>
    )
}

export default SingleProductPage