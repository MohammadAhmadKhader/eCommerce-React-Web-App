import { Link } from 'react-router-dom'

function UsersNav() {
  return (
    <nav>
      <Link to={"/dashboard/users?page=1&limit=15"}>
        Users
      </Link>
    </nav>
  )
}

export default UsersNav