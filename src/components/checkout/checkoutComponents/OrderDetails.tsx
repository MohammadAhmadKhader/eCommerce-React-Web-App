import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import OrderCalcs from '../../cart/cartComponents/OrderCalcs'

function OrderDetails() {
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            <h3 className='text-3xl border-b py-3' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>Order Details</h3>
            <OrderCalcs />
        </div>
    )
}

export default OrderDetails