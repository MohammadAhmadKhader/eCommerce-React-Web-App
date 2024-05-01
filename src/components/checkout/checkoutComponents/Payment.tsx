
import { useForm } from "react-hook-form"
import useAxios from '../../customHooks/useAxios';
import { useContext, useEffect, useState } from 'react';
import { useElements, useStripe, PaymentElement, AddressElement, AffirmMessageElement } from "@stripe/react-stripe-js"
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { GlobalCachingContext } from "../../features/GlobalCachingContext/GlobalCachingProvider";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../features/UserFeature/UserProvider";
import { toast } from "react-toastify";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [succeeded, setIsSucceeded] = useState(false);
  const { singleOrderDetails, getSingleOrderDetails, isSingleOrderDetailsLoading } = useContext(GlobalCachingContext);
  const { userToken, userData } = useContext(UserContext);
  const { POST: POST_OrderCheckingOut } = useAxios();
  const { theme } = useContext(ThemeContext);

  const { formState: { isSubmitting }, handleSubmit } = useForm()
  const pay = async () => {
    try {
      if (!elements || !stripe) {
        return;
      }
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        confirmParams: {
          return_url: `${window.location.origin}/profile/orders/${params.orderId}`
        },
        redirect: "if_required"
      })
      const addressAndPhoneAndName = (await elements.getElement("address").getValue()).value;
      const address = {
        fullName: addressAndPhoneAndName.name,
        state: addressAndPhoneAndName.address.state || "Westbank",
        country: addressAndPhoneAndName.address.country,
        city: addressAndPhoneAndName.address.city,
        streetAddress: addressAndPhoneAndName.address.line1,
        mobileNumber: addressAndPhoneAndName.phone,
        pinCode: addressAndPhoneAndName.address.postal_code,
      }
      if (error) {
        console.log(error)
        setErrorMessage(error.message);
      }
      await OrderCheckingOut(singleOrderDetails._id, address);
      setIsSucceeded(true);
      toast.success("Payment succeeded")
      setIsProcessing(false);

    } catch (error) {
      console.log(error)
    }
  }


  const OrderCheckingOut = async (orderId: string, address: any) => {
    try {
      const { data } = await POST_OrderCheckingOut("/orders/stripe/orderCheckingOut", {
        orderId,
        address
      }, userToken)
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const localStorageListener = () => {
      const address = JSON.stringify(localStorage.getItem("address"));
      console.log(address)

    }

    window.addEventListener("localStorageChange", localStorageListener);
    return () => window.removeEventListener("localStorageChange", localStorageListener)
  }, []);

  useEffect(() => {
    if (succeeded && !isSingleOrderDetailsLoading && singleOrderDetails) {
      localStorage.setItem("CheckedOut","true");
      navigate(`/profile/orders/${params.orderId}`);
    }
  }, [singleOrderDetails, succeeded, isSingleOrderDetailsLoading])


  return (
    <div>
      <form className='flex justify-center items-center flex-col max-w-[600px] m-auto' onSubmit={handleSubmit(pay)}>
        <div className='rounded-xl p-3 m-5 w-full shrink-0'
          style={{

            boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
          }}>
          <PaymentElement

            options={{
              layout: {
                type: "tabs",
                defaultCollapsed: false,
                radios: true
              }

            }} />

          <AddressElement options={{
            mode: "billing",
            fields: {
              phone: 'always',
            },
            autocomplete: { mode: "automatic" },
            validation: {
              phone: { required: "always" }
            }
          }}
            className='mt-2'

          />
          <button disabled={isSubmitting || !stripe || !elements || isProcessing}
            className={`mt-6 w-full ${theme === "dark" ? "bg-[#30313D]" : "bg-[#F1F1F1]"} px-6 py-2 rounded-lg text-white font-semibold tracking-wide
        hover:text-color-accent duration-300 hover:bg-opacity-50
        disabled:hover:text-[auto] disabled:hover:bg-[auto] disabled:hover:cursor-default disabled:hover:bg-opacity-100
        `}
            style={{
              color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",

            }}>
            {!isSubmitting ?
              `Pay $${singleOrderDetails.grandTotal}` : "Processing..."
            }
          </button>
          {errorMessage && <span className='text-sm tracking-wide font-semibold text-red-600'>{errorMessage}</span>}
          {successMessage && !errorMessage && <span className={`text-sm tracking-wide font-semibold ${theme == "dark" ? "text-lime-300" : "text-[#007AFF]"} `}>{successMessage}</span>}
        </div>

      </form>
    </div>
  )
}

export default Payment