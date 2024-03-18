import NewAddress from './checkoutComponents/NewAddress'
import CheckoutOrderSummary from './checkoutComponents/CheckoutOrderSummary'
import OrderDetails from './checkoutComponents/OrderDetails'
import { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import PaymentMethod from './checkoutComponents/PaymentMethod'
import { Link } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'

function Checkout() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <section className='px-4 my-5'>
      <div className='px-4 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
        <Link to="/">
          Home
        </Link>
        <IoChevronForwardOutline />
        <Link to="/checkout">
          Checkout
        </Link>
      </div>
      <h2 className='text-5xl font-semibold text-color-accent'> Checkout</h2>
      <div className='flex gap-x-32 w-full xl:gap-x-32 flex-wrap xl:flex-nowrap'>
        <div className='w-full flex-col xl:w-8/12'>
          <NewAddress />
          <div className='xl:hidden'>
            <CheckoutOrderSummary />
            <OrderDetails />
          </div>
          <PaymentMethod />
        </div>

        <div className='hidden xl:w-4/12 xl:block'>
          <CheckoutOrderSummary />
          <OrderDetails />
        </div>
      </div>
    </section>
  )
}

export default Checkout