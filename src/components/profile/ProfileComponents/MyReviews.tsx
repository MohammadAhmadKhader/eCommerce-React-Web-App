import ReviewComponent from '../../singleProduct/SingleProductPageComponents/ReviewComponent'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext, useEffect, useState } from 'react';
import "./MyReviews.css"
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import useAxios from '../../customHooks/useAxios';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../../features/UserFeature/UserProvider';
import CircularLoader from '../../shared/CircularLoader';

function MyReviews() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { theme } = useContext(ThemeContext)
  const { GET, isLoading: isReviewsLoading } = useAxios()
  const { userData, userToken, isUserFetchDataLoading } = useContext(UserContext)
  const [userReviews, setUserReviews] = useState([])
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1)

  const getUserReviews = async () => {
    try {
      const { data } = await GET(`/reviews/${userData._id}?page=${searchParams.get("page") || "1"}&limit=${searchParams.get("limit") || "9"}`, userToken);
      console.log(data);
      setUserReviews(data.reviews);
      setCount(data.count);
      setMaxCount(Math.ceil(count / Number(searchParams.get("limit") || 9)))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("limit") || searchParams.get("limit") > "30" || searchParams.get("limit") < "9") {
      searchParams.set("page", "1")
      searchParams.set("limit", "9")
      setSearchParams(searchParams)
    }
    getUserReviews()
  }, [])
  return (
    <div className='MyReviews flex flex-col gap-y-4'>
      <div className='border-b' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>
        <h4 className='text-2xl py-2'>
          My Reviews
        </h4>
      </div>

      <div className='flex flex-col gap-y-3'>
        {isReviewsLoading || isUserFetchDataLoading ? <div className='col-span-12'><CircularLoader minHeight={500} /></div> : count > 0 ? userReviews?.map((rev) => {
          return (
            <ReviewComponent mode="self" review={rev} key={rev._id} />
          )
        }) :
          <div className='col-span-12 text-center flex justify-center items-center min-h-[500px]'>
            <h4 className='font-semibold text-2xl'>Seems you did not make any reviews yet!</h4>
          </div>
        }
      </div>


      {count > 0 ? <Stack spacing={2} sx={{
        maxWidth: "fit-content",
        marginBlock: "10px",
        marginInline: "auto"
      }}
        className='bg-color-accent rounded-md'
      >
        <Pagination sx={{
          color: "white !important;"
        }}
          count={maxCount} onChange={(event, newValue) => {
            searchParams.set("page", newValue.toString());
            setSearchParams(searchParams)
          }}
        />
      </Stack> : <></>}
    </div>
  )
}

export default MyReviews