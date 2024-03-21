import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import "./singleProductsPage.css"
import SingleProductTabs from './SingleProductPageComponents/SingleProductTabs';
import ProductCarousel from './SingleProductPageComponents/SingleProductCarousel';
import { VscHeart } from "react-icons/vsc";
import PriceComponent from '../products/ProductsComponents/PriceComponent';
import { Link, useParams, useNavigate, useSearchParams, useBlocker } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import useAxios from '../customHooks/useAxios';
import ImageSkeleton from '../shared/LoadingSkeletons/ImageSkeleton';
import DetailsSkeleton from '../shared/LoadingSkeletons/DetailsSkeleton';
import { IProduct } from '../../types/types';
import Rating from '@mui/material/Rating';
import { UserContext } from '../features/UserFeature/UserProvider';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider';
import { BsCart } from 'react-icons/bs';
import { objectIdSchemaRequired } from '../shared/IdValidation';
import { CartContext } from '../features/CartFeature/CartProvider';


function SingleProductPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    const { getProductData, isProductByIdLoading, product, reviewsCount, setIsProductByIdLoading } = useContext(GlobalCachingContext)
    const { POST } = useAxios()
    const { userData, userToken, getUserData } = useContext(UserContext)
    const { getCartItems } = useContext(CartContext)
    const [isItemInCart, setIsItemInCart] = useState(true);
    const [isItemInWishList, setIsItemInWishList] = useState(true);
    const { theme } = useContext(ThemeContext);
    const [quantity, setQuantity] = useState(1);
    const { categories, isCategoriesLoading } = useContext(GlobalCachingContext)
    const [categoryName, setCategoryName] = useState("All Categories");
    const [categoryId, setCategoryId] = useState("");

    function setCategoryNameAndId() {
        if (!isCategoriesLoading && !isProductByIdLoading) {
            categories.forEach((category) => {
                if (category._id == (product as IProduct).categoryId) {
                    setCategoryId(category._id)
                    setCategoryName(category.name)
                }
            })
        }
    }
    const maxLimit = 30;
    const minLimit = 9;

    const addToCart = async () => {
        try {
            const { data } = await POST("/carts", {
                userId: userData._id,
                quantity: quantity,
                productId: (product as IProduct)._id
            }, userToken)
            if ((product as IProduct).quantity < quantity) {
                toast.error("quantity is more than the available :(");
                return;
            }
            if (data.message == "success") {
                toast.success("Items has been added to cart")
                getUserData();
                getCartItems();
            }
        } catch (error) {
            toast.error("Something Went Wrong Please Try Again later")
            console.log(error)
        }
    }

    const addToWishList = async () => {
        try {
            const { data } = await POST(`/wishlists`, {
                userId: userData._id,
                productId: params.productId
            }, userToken);

            if (data.message == "success") {
                toast.success("Product has been added to your wishlist");
                getUserData();
            }

            setIsProductByIdLoading(false)
        } catch (error) {
            toast.error("Something Went Wrong Please Try Again Later")
            console.log(error)
        }
    }

    useEffect(() => {
        if (userData) {
            const isItFoundInCart = userData.cart.find((cartItem) => cartItem.productId == params.productId);
            if (!isItFoundInCart) {
                setIsItemInCart(false)
            }else{
                setIsItemInCart(true)
            }
        }

        if (userData) {
            const isItFoundInWishList = userData.wishList.find((cartItem) => cartItem.productId == params.productId);
            if (!isItFoundInWishList) {
                setIsItemInWishList(false)
            }else{
                setIsItemInWishList(true)
            }
        }
        setCategoryNameAndId();
        
    }, [userData, product, params.productId])


    useEffect(() => {
        const { error } = objectIdSchemaRequired.validate({ productId: params.productId });
        if (error) {
            navigate("/")
        }
        if (!searchParams.get("page") || !searchParams.get("page")) {
            searchParams.set("page", "1");
            searchParams.set("limit", "9");
            setSearchParams(searchParams)
        } else {
            getProductData(parseInt(searchParams.get("page")).toString() || "1", parseInt(searchParams.get("limit")).toString() || "9", params.productId);
        }

        setCategoryNameAndId();
    }, [])


    useEffect(() => {
        if ((Number(searchParams.get("limit")) ? Number(searchParams.get("limit")) : 30) > maxLimit) {
            searchParams.set("limit", maxLimit.toString())
            setSearchParams(searchParams)
        }

        if ((Number(searchParams.get("limit")) ? Number(searchParams.get("limit")) : 9) < minLimit) {
            searchParams.set("limit", minLimit.toString())
            setSearchParams(searchParams)
        }
        getProductData(parseInt(searchParams.get("page")).toString() || "1", parseInt(searchParams.get("limit")).toString() || "9", params.productId)


        setCategoryNameAndId()
    }, [searchParams, params.productId])
    return (
        <section className='px-3 md:px-5 single-product-page'>
            <div className='px-4 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
                <Link to="/">
                    Home
                </Link>
                <IoChevronForwardOutline />
                <Link to={`/products?page=1&limit=9&category=${categoryId}`}>
                    {categoryName}
                </Link>
                <IoChevronForwardOutline />
                <Link to={`/products/${params.productId}`}>
                    {product ? (product as IProduct).name : ""}
                </Link>
            </div>

            {isProductByIdLoading ?
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
                                        Times Reviewed: {(product as IProduct).ratingNumbers}
                                    </h4>
                                </div>
                            </div>
                            <div>
                                <Rating
                                    sx={{
                                        fontSize: "1.7rem !important",
                                        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                            color: 'var(--stars--color)',
                                        },
                                        color: 'var(--stars--color)'
                                    }}
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
                                            onChange={() => {
                                                if ((product as IProduct).quantity <= quantity) {
                                                    setQuantity((product as IProduct).quantity)
                                                }

                                            }}
                                            style={{
                                                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                                                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                                            }}
                                        />
                                        <button className='size-fit duration-500 border-l py-0.5 px-1 hover:bg-color-accent rounded-r-md'
                                            onClick={() => {
                                                if (!((product as IProduct).quantity <= quantity)) {
                                                    setQuantity(prev => prev + 1)
                                                } else {
                                                    toast.info("You have exceeded the limitation")
                                                }

                                            }}>
                                            <FiPlus size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center gap-x-3 sm:gap-x-5'>
                                    <Tooltip title={userData ? isItemInCart ? "Item already in cart" : undefined : "signing in is required"}>

                                        <button className='text-sm font-semibold w-full py-2 rounded-md flex justify-center gap-x-1 sm:gap-x-4 items-center
                                 text-white bg-color-accent hover:bg-transparent hover:text-color-accent border-color-accent border-2 duration-300
                                 disabled:bg-color-accent disabled:opacity-65 disabled:text-white disabled:hover:text-white
                                 '
                                            disabled={userData ? (isItemInCart ? true : false) : true}
                                            onClick={() => {
                                                if (userData && !isItemInCart) {
                                                    addToCart();

                                                }
                                            }}
                                        >
                                            <span>
                                                <BsCart size={22} />
                                            </span>
                                            <span>
                                                Add to Cart
                                            </span>

                                        </button></Tooltip>
                                    <Tooltip title={userData ? (isItemInWishList ? "Item already in wishlist" : "") : "signing in is required"}>

                                        <button className={`text-sm font-semibold w-full py-2 rounded-md flex justify-center gap-x-1 sm:gap-x-4 items-center text-color-accent bg-transparent
                                 border-2 border-color-accent hover:bg-color-accent hover:text-white duration-300 
                                 disabled:hover:bg-transparent disabled:hover:text-color-accent  disabled:opacity-65 }`}
                                            disabled={userData ? (isItemInWishList ? true : false) : true}
                                            onClick={() => {
                                                if (userData && !isItemInWishList) {
                                                    addToWishList();
                                                }
                                            }}
                                        >
                                            <span>
                                                <VscHeart size={22} />
                                            </span>
                                            <span>
                                                Add to Wishlist
                                            </span>

                                        </button></Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className='my-5'>
                <SingleProductTabs reviewsCount={reviewsCount} reviewsLimit={Number(searchParams.get("limit"))} product={product as IProduct} isProductByIdLoading={isProductByIdLoading} />
            </div>

        </section>
    )
}

export default SingleProductPage

