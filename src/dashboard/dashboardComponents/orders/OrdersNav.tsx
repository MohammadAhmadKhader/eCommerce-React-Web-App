import { Link } from 'react-router-dom'

function OrdersNav() {
  return (
    <nav>
        <Link className='font-semibold' to={"/dashboard/orders?page=1&limit=20"}>
            Orders
        </Link>
    </nav>
  )
}

export default OrdersNav