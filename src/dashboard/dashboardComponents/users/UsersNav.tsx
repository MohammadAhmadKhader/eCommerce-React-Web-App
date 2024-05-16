import { Link } from 'react-router-dom'

function UsersNav() {
  return (
    <nav className='flex flex-col gap-y-2 border-t border-opacity-10 py-2'>
      <Link className='font-semibold' to={"/dashboard/users?page=1&limit=15"}>
        Users
      </Link>
      <Link className='font-semibold' to={"/dashboard/users/create"}>
        Create User
      </Link>
    </nav>
  )
}

export default UsersNav