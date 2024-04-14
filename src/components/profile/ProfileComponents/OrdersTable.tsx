import { useContext, useEffect } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import MyOrdersItem from './MyOrdersItem';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../../features/UserFeature/UserProvider';
import CircularLoader from '../../shared/CircularLoader';
import useDebounce from '../../customHooks/useDebounce';
import PaginationComponent from '../../shared/PaginationComponent';


function OldOrdersTable({ orders, count, getOrders }) {
  const { theme } = useContext(ThemeContext);
  const { isUserFetchDataLoading } = useContext(UserContext);
  const { debounce } = useDebounce()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status") && (searchParams.get("status") == "Processing" ||
      searchParams.get("status") == "Completed" || searchParams.get("status") == "Cancelled" || searchParams.get("status") == "Placed")) {
      debounce(() => {
        getOrders(searchParams.get("status"), searchParams.get("page"), searchParams.get("limit"));
      }, 200)
    }

  }, [searchParams])

  return (
    <div>
      <div className='grid grid-cols-10 py-2 border-b opacity-70 font-semibold text-left w-full px-6 gap-x-5 ' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>
        <h4 className='col-span-3'>Order ID</h4>
        <h4 className='col-span-2'>Date</h4>
        <h4 className='col-span-2'>Price</h4>
        <h4 className='col-span-1'>Status</h4>
      </div>
      <div className='text-black my-3 flex flex-col gap-y-3'>
        {!isUserFetchDataLoading ?
          orders.length > 0 ?
            orders.map((orderItem) => {
              return (
                <MyOrdersItem OrderID={orderItem._id} Date={orderItem.createdAt}
                  IsPaid={orderItem?.isPaid || false} Price={orderItem.grandTotal} key={orderItem._id} />
              )
            }) :
            <div className='w-full'>
              <div className='flex justify-center items-center min-h-[500px]'>
                <h4 className='text-2xl font-semibold' style={{
                  color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
                }}>It's empty here no order has been made yet with this status</h4>
              </div>
            </div> : <CircularLoader minHeight={500} />
        }
        {orders?.length > 0 && <PaginationComponent customClasses='bg-color-accent rounded-md mx-auto mt-auto' count={count} />
        }
      </div>

    </div>
  )
}

export default OldOrdersTable