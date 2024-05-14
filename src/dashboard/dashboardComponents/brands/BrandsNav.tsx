import { Link } from 'react-router-dom'

function BrandsNav() {
  return (
    <nav>
        <Link to={"/dashboard/brands?page=1&limit=9"}>
            Brands
        </Link>
    </nav>
  )
}

export default BrandsNav