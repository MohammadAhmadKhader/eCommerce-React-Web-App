
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./cartTable.css"
import CartTableItem from './CartTableItem';
import ItemSkeleton from '../../shared/LoadingSkeletons/ItemSkeleton';
import { CartContext } from '../../features/CartFeature/CartProvider';

function CartTable() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const {cartItems ,isCartLoading} : any = useContext(CartContext)
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
                    {isCartLoading ? <div className='mt-4 flex flex-col gap-y-4'>
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={450} widthTextSecondRectangular={450} />
                        <ItemSkeleton imgHolderVariant='rectangular' widthTextFirstRectangular={450} widthTextSecondRectangular={450} />

                    </div> :
                        cartItems?.cart?.map((item) => {
                            return (
                                <React.Fragment key={item.productId._id}>
                                    <CartTableItem imgUrl={item.productId.images[0]?.thumbnailUrl} productId={item.productId._id} brand={item.productId.brand}
                                    cartItemId={item._id} name={item.productId.name} price={item.productId.finalPrice} quantity={item.quantity}  />
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table></div>
    )
}

export default CartTable