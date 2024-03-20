import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderCalcs from '../../cart/cartComponents/OrderCalcs'
import { GlobalCachingContext } from '../../features/GlobalCachingContext/GlobalCachingProvider';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { theme } = useContext(ThemeContext);
    const { singleOrderDetails, getSingleOrderDetails } = useContext(GlobalCachingContext);
    const params = useParams();
    console.log(params)
    useEffect(() => {
        getSingleOrderDetails(params.orderId)
    }, [])

    return (
        <div>
            <h3 className='text-3xl border-b py-3' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>Order Details</h3>
            <OrderCalcs deliveryFee={singleOrderDetails.deliveryFee} discount={singleOrderDetails.discount}
                grandTotal={singleOrderDetails.grandTotal}
                subTotal={singleOrderDetails.subTotal} />
        </div>
    )
}

export default OrderDetails