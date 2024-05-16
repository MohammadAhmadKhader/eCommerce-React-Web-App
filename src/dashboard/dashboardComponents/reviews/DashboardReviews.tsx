import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { useSearchParams } from 'react-router-dom';
import TableLayout from '../dashboardShared/TableLayout';
import ReviewsTable from './ReviewsTable';

function DashboardReviews() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userToken } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const { GET, isLoading } = useAxios();

  const getAllReviews = async (page, limit) => {

    try {
      const { data } = await GET(`/reviews?page=${page}&limit=${limit}`, userToken);
      console.log(data)
      setReviews(data.reviews);
      setCount(data.count);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getAllReviews(searchParams.get("page"), searchParams.get("limit"));
  }, [searchParams])


  return (
    <TableLayout count={count} title='Reviews'>
      <div className='my-5'>
        <ReviewsTable count={count} isLoading={isLoading} reviews={reviews} />
      </div>
    </TableLayout>
  )
}

export default DashboardReviews