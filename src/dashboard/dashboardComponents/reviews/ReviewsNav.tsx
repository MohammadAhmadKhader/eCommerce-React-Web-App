import { Link } from 'react-router-dom'

function ReviewsNav() {
  return (
    <nav>
        <Link to={"/dashboard/reviews"}>
            Reviews
        </Link>
    </nav>
  )
}

export default ReviewsNav