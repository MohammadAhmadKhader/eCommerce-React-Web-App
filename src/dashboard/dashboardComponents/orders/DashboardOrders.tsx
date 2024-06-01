import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';
import { useSearchParams } from 'react-router-dom';
import TableLayout from '../dashboardShared/TableLayout';
import OrdersTable from './OrdersTable';

function DashboardOrders() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const { GET, isLoading } = useAxios();

  const getAllOrders = async (page, limit) => {

    try {
      const { data } = await GET(`/dashboard/orders?page=${page}&limit=${limit}&subTotal_lte=1000`, userToken);
      console.log(data)
      setOrders(data.orders);
      setCount(data.count);
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getAllOrders(searchParams.get("page"), searchParams.get("limit"));
  }, [searchParams])


  return (
    <TableLayout count={count} title='Orders'>
      <div className='my-5'>
        <OrdersTable count={count} isLoading={isLoading} orders={orders} />
      </div>
    </TableLayout>
  )
}

export default DashboardOrders