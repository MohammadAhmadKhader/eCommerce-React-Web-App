import { Link } from 'react-router-dom'

function CategoriesNav() {
  return (
    <nav>
        <Link to={"/dashboard/categories"}>
            Categories
        </Link>
    </nav>
  )
}

export default CategoriesNav