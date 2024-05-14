import { Link } from 'react-router-dom'

function ProductsNav() {
  return (
    <nav>
        <Link to={"/dashboard/products"}>
            Products
        </Link>
    </nav>
  )
}

export default ProductsNav