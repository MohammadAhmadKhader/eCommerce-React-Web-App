import React, { useContext, useEffect, useState } from 'react'
import CartTable from './cartComponents/CartTable'
import CartOrderSummary from './cartComponents/CartOrderSummary'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import CouponSection from './cartComponents/CouponSection'
import { Link } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { CartContext } from '../features/CartFeature/CartProvider'


function Cart() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const {cartItems,getCartItems,isCartLoading} =useContext(CartContext)
    
    return (
        <section className='px-4 my-5'>
            <div className='px-4 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
                <Link to="/">
                    Home
                </Link>
                <IoChevronForwardOutline />
                <Link to="/cart">
                    My Cart
                </Link>
            </div>
            <h2 className='text-5xl font-semibold text-color-accent'>My Cart</h2>
            <div className='flex gap-x-32 w-full xl:gap-x-32 flex-wrap xl:flex-nowrap'>
                <div className='w-full xl:w-8/12'>
                    <CartTable/>
                    <div className='mt-24'>
                        <CouponSection />
                    </div>
                </div>
                <div className='w-full xl:w-4/12 mt-10'>
                    <CartOrderSummary />
                </div>
            </div>
        </section>
    )
}

export default Cart