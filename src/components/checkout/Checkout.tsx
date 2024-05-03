import NewAddress from './checkoutComponents/NewAddress'
import CheckoutOrderSummary from './checkoutComponents/CheckoutOrderSummary'
import OrderDetails from './checkoutComponents/OrderDetails'
import { useContext, useEffect, useState } from 'react'
import PaymentMethod from './checkoutComponents/PaymentMethod'
import { Link, useParams } from 'react-router-dom'
import { IoChevronForwardOutline } from 'react-icons/io5'
import AddressSelector from './checkoutComponents/AddressSelector'
import ContactInfo from '../shared/ListCollapse'
import ListCollapse from '../shared/ListCollapse'
import Payment from './checkoutComponents/Payment'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import useAxios from '../customHooks/useAxios'
import CircularLoader from '../shared/CircularLoader'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { UserContext } from '../features/UserFeature/UserProvider'
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider'

function Checkout() {
  const [checkoutSteps, setCheckoutSteps] = useState(0);
  const { POST: POST_createPaymentIntent } = useAxios();
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { userData, userToken } = useContext(UserContext);
  const { singleOrderDetails, getSingleOrderDetails } = useContext(GlobalCachingContext);
  const params = useParams();

  const createPaymentIntent = async () => {
    try {
      const { data } = await POST_createPaymentIntent("/orders/stripe/createPaymentIntent", {
        orderId: singleOrderDetails._id,
      }, userToken);
      
      setClientSecret(data.clientSecret);
      return data.clientSecret
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      const stripePromise = await loadStripe(import.meta.env.VITE_PK_STRIPE);
      setStripePromise(stripePromise)
    })()
    getSingleOrderDetails(params.orderId)
  }, [])

  useEffect(() => {
    if (singleOrderDetails && stripePromise) {
      createPaymentIntent()
    }
  }, [singleOrderDetails, stripePromise])

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
        {
          checkoutSteps === 0 ?
            <div className='w-full flex-col xl:w-8/12'>

              <NewAddress />
              <div className='xl:hidden'>
                <CheckoutOrderSummary />
                <OrderDetails />
              </div>
              <PaymentMethod setCheckoutSteps={setCheckoutSteps} />
            </div>
            :
            <div className='w-full flex-col xl:w-8/12'>
              <ListCollapse Title='Contact Info' CustomComponent={AddressSelector} />

              {stripePromise && clientSecret && <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: `${theme === "dark" ? "night" : "flat"}`,
                  },
                }}>
                <ListCollapse Title='Payments' CustomComponent={Payment} />
              </Elements>
                ||
                <div className='flex items-center justify-center min-h-[400px]'>
                  <CircularLoader minHeight={"400px"} />
                </div>
              }

              <div className='w-full flex justify-between'>
                <button
                  className='text-white bg-color-accent rounded-md px-12 py-1.5 duration-300 hover:bg-transparent 
                  hover:text-color-accent border border-color-accent mt-2'
                  onClick={() => {
                    setCheckoutSteps(0)
                  }}>Back</button>
              </div>
            </div>
        }

        <div className='hidden xl:w-4/12 xl:block'>
          <CheckoutOrderSummary />
          <OrderDetails />
        </div>
      </div>
    </section>
  )
}

export default Checkout

