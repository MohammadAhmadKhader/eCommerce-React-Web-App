import { Link } from 'react-router-dom'

function CategoriesNav() {
  return (
    <nav className='flex flex-col gap-y-2 border-t border-opacity-10 py-2'>
      <Link className='font-semibold' to={"/dashboard/categories"}>
        Categories
      </Link>
      <Link className='font-semibold' to={"/dashboard/categories/create"}>
        Create Category
      </Link>
    </nav>
  )
}

export default CategoriesNav