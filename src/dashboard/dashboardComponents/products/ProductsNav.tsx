import { Link } from 'react-router-dom'

function ProductsNav() {
  return (
    <nav className='flex flex-col gap-y-2 border-t border-opacity-10 py-2'>
      <Link className='font-semibold' to={"/dashboard/products?page=1&limit=20"}>
        Products
      </Link>
      <Link className='font-semibold' to={"/dashboard/products/create"}>
        Create Product
      </Link>
    </nav>
  )
}

export default ProductsNav