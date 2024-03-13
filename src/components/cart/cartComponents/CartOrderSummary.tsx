
import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderCalcs from './OrderCalcs'
import { Link } from 'react-router-dom'

function CartOrderSummary() {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <h3 className='text-3xl border-b py-3' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>Order Summary</h3>
      <div>
        <OrderCalcs />
        <div className='flex items-center justify-between gap-x-1 md:gap-x-8 mt-12'>
          <Link to="/checkout" title='Place Order'
            className='duration-300 bg-color-accent rounded-md px-1 md:px-3 py-1.5 w-1/2 text-white hover:bg-transparent 
          hover:text-color-accent border-color-accent border flex items-center justify-center'>
            <span className='line-clamp-1'>
              Place Order
            </span>

          </Link>

          <Link to="/" title='Continue Shopping'
            className='duration-300 text-color-accent border-color-accent border rounded-md px-1 md:px-3
           py-1.5 w-1/2 hover:text-white hover:bg-color-accent flex items-center justify-center'>
            <span className='line-clamp-1'>
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default CartOrderSummary