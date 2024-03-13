import React, { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderSummaryItem from './OrderSummaryItem'

function CheckoutOrderSummary() {
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            <h3 className='text-3xl border-b py-3' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>Order Summary</h3>
            <div className='flex flex-col gap-y-3 my-5'>
                <OrderSummaryItem />
                <OrderSummaryItem />
                <OrderSummaryItem />
            </div>
        </div>
    )
}

export default CheckoutOrderSummary