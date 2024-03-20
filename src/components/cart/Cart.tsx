import CartTable from './cartComponents/CartTable'
import CartOrderSummary from './cartComponents/CartOrderSummary'
import CouponSection from './cartComponents/CouponSection'
import { Link } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useContext } from 'react'
import { CartContext } from '../features/CartFeature/CartProvider'
const emptyCartImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/mmuwtrlrbejebc4ub0rm"

function Cart() {
    const { cartItems } = useContext(CartContext)
    return (
        <section className='px-4 my-5'>
            {cartItems.length != 0 ?
                <>
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
                            <CartTable />
                            <div className='mt-24'>
                                <CouponSection />
                            </div>
                        </div>
                        <div className='w-full xl:w-4/12 mt-10'>
                            <CartOrderSummary />
                        </div>
                    </div>
                </> :
                <div className='w-full flex justify-center items-center min-h-[600px]'>
                    <div className='max-w-[380px] text-center flex flex-col gap-y-5'>
                        <div>
                            <img className='mx-auto'
                                src={emptyCartImage} alt="empty cart image" />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-3xl font-semibold'>Uh Oh....!</h2>
                            <h2>
                                You haven’t added any any items. Start shopping to make your bag bloom
                            </h2>
                        </div>
                        <Link to="/" className='text-white bg-color-accent rounded-lg min-w-[150px] py-2.5 text-xl font-semibold duration-300
                        hover:text-color-accent hover:bg-transparent border-color-accent border
                        '>
                            Go Back Home
                        </Link>
                    </div>

                </div>

            }



        </section>
    )
}

export default Cart