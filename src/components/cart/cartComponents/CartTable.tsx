
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./cartTable.css"
import CartTableItem from './CartTableItem';
import useAxios from '../../customHooks/useAxios';
import ItemSkeleton from '../../shared/LoadingSkeletons/ItemSkeleton';
const tempImg = "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1708290481~exp=1708291081~hmac=2b691806f30732ec151458d70d803fcdbb888db344b5bd9b2b30d749438857f5"

function CartTable() {
    const { GET, POST, isLoading, setIsLoading } = useAxios()
    const [cartItems, setCartItems] = useState([])

    const getCartItems = async () => {
        const { data } = await GET(`/carts/${import.meta.env.VITE_ADMIN_ID}`,import.meta.env.VITE_ADMIN_TOKEN)
        setCartItems(data.cartItems);
        setIsLoading(false)
        return data
    }
    useEffect(() => {
        getCartItems()
    }, [])

    const { theme } = useContext(ThemeContext)

    return (
        <div className='overflow-x-scroll cart-table-container'>
            <table className='mt-5 w-full' style={{
                minWidth: "660px"
            }}>
                <thead>
                    <tr className='border-b h-10 text-xl' style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}>
                        <th className='text-left font-normal'>Product Name</th>
                        <th className='text-left font-normal'>Price</th>
                        <th className='text-left font-normal'>Qty</th>
                        <th className='text-left font-normal'>Subtotal</th>
                        <th className='text-end font-normal'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className='mt-4 flex flex-col gap-y-4'>
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={540} widthTextSecondRectangular={540} />
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={540} widthTextSecondRectangular={540} />

                    </div> :
                        cartItems.map((item) => {
                            return (
                                <React.Fragment key={item._id}>
                                    <CartTableItem imgUrl={item.images[0].thumbnailUrl}
                                        name={item.name} price={item.finalPrice} quantity={item.quantity} />
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table></div>
    )
}

export default CartTable