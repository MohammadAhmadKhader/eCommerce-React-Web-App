
import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderCalcs from './OrderCalcs'
import { Link, useNavigate } from 'react-router-dom'
import useDebounce from '../../customHooks/useDebounce'
import useAxios from '../../customHooks/useAxios'
import { UserContext } from '../../features/UserFeature/UserProvider'
import { toast } from 'react-toastify'
import { CartContext } from '../../features/CartFeature/CartProvider'

function CartOrderSummary() {
  const navigate = useNavigate()
  const { debounce } = useDebounce()
  const { POST } = useAxios()
  const { theme } = useContext(ThemeContext)
  const { userToken, userData, getUserData } = useContext(UserContext)
  const { cartItems } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const loadingRef = useRef(null);

  useEffect(() => {
    cartItems.forEach((item) => {
      setSubTotal(prevSubTotal => prevSubTotal + item.cartItem.finalPrice)
    })
  }, [cartItems])

  useEffect(() => {
    setGrandTotal(subTotal - deliveryFee - discount)
  }, [subTotal, deliveryFee, discount])

  const createOrder = async () => {
    try {
      loadingRef.current = toast.loading("Your order being placed...")
      const { data } = await POST("/orders", {
        userId: userData,
      }, userToken)

      if (data.message == "success") {
        getUserData()
        navigate(`/checkout/${data.order._id}`);
        toast.success("Order has been created Successfully!");
      }

    } catch (error) {
      toast.dismiss(loadingRef.current)
      console.log(error)
      toast.error("Something Went Wrong Please Try Again Later")
    }
  }
  return (
    <div>
      <h3 className='text-3xl border-b py-3' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>Order Summary</h3>
      <div>
        <OrderCalcs deliveryFee={deliveryFee} discount={discount} subTotal={subTotal} grandTotal={grandTotal} />
        <div className='flex items-center justify-between gap-x-1 md:gap-x-8 mt-12'>
          <button title='Place Order'
            className='duration-300 bg-color-accent rounded-md px-1 md:px-3 py-1.5 w-1/2 text-white hover:bg-transparent 
          hover:text-color-accent border-color-accent border flex items-center justify-center text-sm'
            onClick={() => {
              debounce(() => { createOrder() })
            }}
          >
            <span className='line-clamp-1'>
              Place Order
            </span>

          </button>

          <Link to="/products?page=1&limit=9" title='Continue Shopping'
            className='duration-300 text-color-accent border-color-accent border rounded-md px-1 md:px-3
           py-1.5 w-1/2 hover:text-white hover:bg-color-accent flex items-center justify-center text-sm'>
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