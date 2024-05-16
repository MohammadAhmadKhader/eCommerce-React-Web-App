import { Link } from 'react-router-dom'

function BrandsNav() {
  return (
    <nav className='flex flex-col gap-y-2 border-t border-opacity-10 py-2'>
      <Link className='font-semibold' to={"/dashboard/brands?page=1&limit=9"}>
        Brands
      </Link>
      <Link className='font-semibold' to={"/dashboard/brands/create"}>
        Create Brands
      </Link>
    </nav>
  )
}

export default BrandsNav