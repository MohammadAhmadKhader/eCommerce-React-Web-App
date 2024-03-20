import React, { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderSummaryItem from './OrderSummaryItem'
import { GlobalCachingContext } from '../../features/GlobalCachingContext/GlobalCachingProvider'

function CheckoutOrderSummary() {
    const { theme } = useContext(ThemeContext)
    const { singleOrderDetails } = useContext(GlobalCachingContext)
    console.log(singleOrderDetails)
    return (
        <div>
            <h3 className='text-3xl border-b py-3' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>Order Summary</h3>
            <div className='flex flex-col gap-y-3 my-5'>
                {singleOrderDetails?.length === 0 ? null :

                    singleOrderDetails?.orderItems?.map((orderItem) => {
                        return (
                            <OrderSummaryItem quantity={orderItem?.quantity} name={orderItem?.name}
                                brand={orderItem?.cartItem?.brand} key={orderItem?._id} image={orderItem?.thumbnailUrl} />
                        )
                    })

                }

            </div>
        </div>
    )
}

export default CheckoutOrderSummary