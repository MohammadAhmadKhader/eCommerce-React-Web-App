import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { MdOutlineCancel } from "react-icons/md";
import { IWishlistItem } from '../../../types/types';
import { UserContext } from '../../features/UserFeature/UserProvider';
import useAxios from '../../customHooks/useAxios';
import useDebounce from '../../customHooks/useDebounce';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

function MyWishListItem({ imgUrl, name, productId, wishListId }) {
    const { theme } = useContext(ThemeContext)
    const { DELETE } = useAxios();
    const { userData, userToken, getUserData } = useContext(UserContext)
    const { debounce } = useDebounce()

    const removeFromWishList = async () => {
        try {
            console.log(userData._id, wishListId)
            const response = await DELETE(`/wishlists`, {
                userId: userData._id,
                wishlistItemId: wishListId
            }, userToken);
            console.log(response)
            if (response.status == 202) {
                toast.success("Product was removed from wishlist");
                getUserData();
            }
        } catch (error) {
            toast.error("Something Went Wrong Please Try Again Later")
            console.log(error)
        }
    }
    return (
        <Link className='col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col rounded-lg border relative' to={`/products/${productId}?page=1&limit=9`} style={{
            backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
            borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
        }}>
            <div className=' bg-white flex items-center rounded-t-md'>
                <img src={imgUrl} alt={name} className='rounded-t-md object-contain aspect-square' />
            </div>
            <div className='py-2 px-3'>
                <div className='flex flex-col justify-between'>
                    <Tooltip title={name} arrow placement="top-end">
                        <h4 className='text-md font-semibold line-clamp-1'>{name}</h4>
                    </Tooltip>
                    <button className='rounded-md text-sm tracking-wide font-semibold text-white bg-red-600 px-6 py-1 mb-1 mt-2 duration-300 hover hover:bg-red-800'
                        onClick={(event) => {
                            debounce(() => { removeFromWishList() }, 200);
                            event.preventDefault();
                            event.stopPropagation();
                        }}>

                        <span>
                            Remove Item
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default MyWishListItem