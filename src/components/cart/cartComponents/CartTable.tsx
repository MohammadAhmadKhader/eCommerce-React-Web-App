
import React, { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./cartTable.css"
import CartTableItem from './CartTableItem';
import ItemSkeleton from '../../shared/LoadingSkeletons/ItemSkeleton';
import { CartContext } from '../../features/CartFeature/CartProvider';

function CartTable() {
    const { theme } = useContext(ThemeContext)
    const { cartItems, isCartLoading }: any = useContext(CartContext)
    return (
        <div className='overflow-x-scroll md:overflow-auto cart-table-container'>
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
                    {isCartLoading ? <div className='mt-4 flex flex-col gap-y-4'>
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={450} widthTextSecondRectangular={450} />
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={450} widthTextSecondRectangular={450} />

                    </div> :
                        cartItems?.map((item) => {
                            return (
                                <React.Fragment key={item.cartItem._id}>
                                    <CartTableItem imgUrl={item.cartItem.images[0]?.thumbnailUrl} productId={item.cartItem._id} brand={item.cartItem.brand}
                                        cartItemId={item._id} name={item.cartItem.name} price={item.cartItem.finalPrice} quantity={item.quantity} />
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table></div>
    )
}

export default CartTable