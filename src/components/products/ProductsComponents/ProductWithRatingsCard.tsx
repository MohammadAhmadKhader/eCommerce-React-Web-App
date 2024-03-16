import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import HeartIcon from '../../shared/HeartIcon';
import PriceComponent from './PriceComponent';
import { IProductWithRatingsCardProps } from '../../../types/types';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from '../../features/UserFeature/UserProvider';
import useAxios from '../../customHooks/useAxios';
import useDebounce from '../../customHooks/useDebounce';
import { toast } from 'react-toastify';


function ProductWithRatingsCard({ name, finalPrice, price, offer, imageUrl, avgRating, brand, ratingNumbers, _id }: IProductWithRatingsCardProps) {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext);
    const { POST, setIsLoading } = useAxios();
    const { userData, userToken, getUserData } = useContext(UserContext)
    const { debounce } = useDebounce()
    const [isItemOwned, setIsItemOwned] = useState(false);

    const addToWishList = async () => {
        try {
            const { data } = await POST(`/wishlists`, {
                userId: userData._id,
                productId: _id
            }, userToken);

            if (data.message == "success") {
                toast.success("Product has been added to your wishlist");
                getUserData()
            }

            setIsLoading(false)
        } catch (error) {
            toast.error("Something Went Wrong Please Try Again Later")
            console.log(error)
        }
    }

    useEffect(() => {
        if (userData) {
            userData.wishList.map((item) => {
                if (item.productId == _id) {
                    setIsItemOwned(true)
                }
            })
        }
    }, [userData])

    return (
        <div className='col-span-12 sm:col-span-6 xl:col-span-4 border rounded-md' style={{
            backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
        }}>
            <Link to={`/products/${_id}?page=1&limit=9`} className=' bg-white flex items-center rounded-t-md'>
                <img src={imageUrl}
                    alt={name}
                    className='rounded-t-md object-contain aspect-square' />
            </Link>
            <div className='p-3'>
                <div>
                    <h3 className='flex flex-nowrap justify-between items-center'>
                        <span title={name} className='line-clamp-1 font-semibold'>
                            {name}
                        </span>
                        <span className='hover:cursor-pointer' onClick={() => {
                            if (userData && userData.wishList.length < 6) {
                                debounce(() => { addToWishList() })
                            } else if (userData && userData.wishList.length == 6) {
                                toast.info("You have exceeded the limitations, max wishlist items is 6")
                            } else {
                                navigate("/login")
                            }

                        }}>
                            <Tooltip title={isItemOwned ? "You already have this item" : "Add to wishlist"} placement="top-end" arrow>
                                <span>
                                    <HeartIcon strokeWidth={2.5} respectTheme={isItemOwned ? false : true}
                                        stroke={isItemOwned ? "#FF4444" : undefined}
                                        fill={isItemOwned ? "#FF4444" : "none"}
                                        customClasses={isItemOwned ? "opacity-[1]" : ""}
                                    />
                                </span>
                            </Tooltip>
                        </span>
                    </h3>
                    <h3 className='mb-1 text-sm opacity-80'>Brand : {brand}</h3>
                    <div className='flex justify-between items-center'>
                        <Rating
                            sx={{
                                fontSize: "1.25rem !important",
                                '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                    color: 'var(--stars--color)',
                                },
                                color: 'var(--stars--color)'
                            }}

                            style={{ fontSize: 20 }}
                            name="read-only" value={avgRating} precision={0.1} readOnly />
                        <span className='text-sm font-semibold'>{ratingNumbers} Ratings</span>
                    </div>

                    <div className='mt-1'>
                        <PriceComponent finalPrice={finalPrice} price={price} offer={offer} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductWithRatingsCard