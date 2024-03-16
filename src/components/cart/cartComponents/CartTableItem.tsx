import { FaTrash } from "react-icons/fa";
import { PiHandbagSimple } from 'react-icons/pi';
import { ICartTableItem, IProduct } from "../../../types/types";
import { Link } from "react-router-dom";
import useDebounce from "../../customHooks/useDebounce";
import useAxios from "../../customHooks/useAxios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../features/UserFeature/UserProvider";
import Tooltip from '@mui/material/Tooltip';
import { toast } from "react-toastify";
import { CartContext } from "../../features/CartFeature/CartProvider";



function CartTableItem({ imgUrl, name, price, quantity, productId, brand, cartItemId}: ICartTableItem) {
    const [includedCount, setIncludedCount] = useState(0)
    const { debounce } = useDebounce()
    const { DELETE, isLoading: isItemDeleting } = useAxios()
    const { userData, userToken } = useContext(UserContext)
    const { POST, isLoading } = useAxios()
    const loadingToastRef = useRef(null)
    const {getCartItems} = useContext(CartContext)
    useEffect(() => {
        userData.wishList.map((item) => {
            if (item.productId == productId) {
                setIncludedCount(prevCount => prevCount + 1)
            }
        })

    }, [])
    const deleteItemFromCart = async (cartItemId: string) => {
        try {
            const response = await DELETE("/carts/deleteCartItem", {
                userId: userData._id,
                cartItemId: cartItemId
            }, userToken)
            if (response.status == 204) {
                toast.loading("Updating cart items",{
                    position: "top-center",
                })
                await getCartItems()
                toast.dismiss()
            }
        } catch (error) {
            toast.error("Something Went Wrong Please try again later")
            return error;
        }
    }

    const addItemToWishList = async (productId) => {
        try {
            await POST("/wishlists", {
                userId: userData._id,
                productId: productId
            }, userToken)
        } catch (error) {
            return error
        }
    }
    return (
        <tr>
            <td className='p-2' width={"45%"}>
                <div className='flex gap-x-3'>
                    <Link to={`/products/${productId}`} className='flex-shrink-0'>
                        <img className='rounded-lg max-h-600 border blur-sm' height={'80px'} width={'75px'}
                            src={imgUrl}
                            alt={name} onLoad={(e) => {
                                const Img = e.currentTarget;
                                Img.classList.remove("blur-sm")
                            }} />
                    </Link>
                    <div className='flex flex-col justify-center gap-y-2'>
                        <h4 title={'Product name'} className='line-clam-1 text-xl font-semibold'>{name}</h4>
                        <span className='text-white opacity-80'>Brand : {brand}</span>
                    </div>
                </div>
            </td>
            <td className='py-2' width={"15%"}>
                ${price}
            </td>
            <td className='py-2' width={"10%"}>
                {quantity}
            </td>
            <td className='py-2' width={"15%"}>
                ${(price * quantity).toFixed(2)}
            </td>
            <td width={"15%"}>
                <div className='flex flex-col w-fit gap-y-2 ms-auto'>
                    <Tooltip title={includedCount !== 0 ? `${"item already included in wishlist"}` : undefined} arrow placement="top-end">
                        <button className='px-2 py-1 flex items-center gap-x-1 duration-300 rounded-md text-white
             bg-color-accent hover:bg-transparent hover:text-color-accent border-color-accent border justify-start
             disabled:bg-color-accent disabled:opacity-75 disabled:hover:text-white text-sm
             ' style={{
                                minWidth: "150px"
                            }}
                            onClick={() => {
                                if (includedCount === 0) {
                                    debounce(() => { addItemToWishList(productId) });
                                }
                            }} disabled={includedCount == 0 ? false : true}>
                            <span>
                                <PiHandbagSimple size={19} />
                            </span>
                            <span className='flex-shrink-0'>
                                Add To Wishlist
                            </span>
                        </button></Tooltip>
                    <button className='px-2 py-1 flex items-center gap-x-1 duration-300 rounded-md text-white
             bg-rose-600 hover:text-rose-600 hover:bg-transparent border border-rose-600 justify-start text-sm' style={{
                            minWidth: "150px"
                        }}
                        onClick={() => {
                            debounce(() => { deleteItemFromCart(cartItemId) });
                        }}
                    >
                        <span>
                            <FaTrash size={19} />
                        </span>
                        <span className='flex-shrink-0'>
                            Remove
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartTableItem