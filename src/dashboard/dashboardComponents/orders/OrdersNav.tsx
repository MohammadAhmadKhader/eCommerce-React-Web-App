import { Link } from 'react-router-dom'

function OrdersNav() {
  return (
    <nav>
        <Link to={"/dashboard/orders"}>
            Orders
        </Link>
    </nav>
  )
}

export default OrdersNav