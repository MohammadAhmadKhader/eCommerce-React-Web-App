import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import HeartIcon from '../../shared/HeartIcon';
import PriceComponent from './PriceComponent';
import { IProductWithRatingsCardProps } from '../../../types/types';
import Rating from '@mui/material/Rating';

function ProductWithRatingsCard({ name, finalPrice, price, offer, imageUrl, avgRating, brand, ratingNumbers, _id }: IProductWithRatingsCardProps) {
    const { theme } = useContext(ThemeContext)

    return (
        <div className='col-span-12 sm:col-span-6 xl:col-span-4 border rounded-md' style={{
            backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
        }}>
            <Link to={`/products/${_id}`} className=' bg-white flex items-center rounded-t-md'>
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
                        <span className='hover:cursor-pointer'>
                            <HeartIcon />
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