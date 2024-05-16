import { Link } from 'react-router-dom'

function ReviewsNav() {
  return (
    <nav>
      <Link className='font-semibold' to={"/dashboard/reviews?page=1&limit=20"}>
        Reviews
      </Link>
    </nav>
  )
}

export default ReviewsNav