import React, { useContext, useEffect, useState } from 'react'
import TableLayout from '../dashboardShared/TableLayout'
import { useSearchParams } from 'react-router-dom';
import useAxios from '../../../customHooks/useAxios';
import InvoicesTable from './InvoicesTable';
import { UserContext } from '../../../components/features/UserFeature/UserProvider';

function DashboardInvoices() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userToken } = useContext(UserContext);
  const [invoices, setInvoices] = useState([]);
  const { GET, isLoading } = useAxios();

  const getAllInvoices = async (page,limit) => {
    try {
      const { data } = await GET(`/invoices?page=${page}&limit=${limit}`, userToken);
      
      setInvoices(data.invoices);
      setCount(data.count);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllInvoices(searchParams.get("page"),searchParams.get("limit"))
  }, [searchParams])
  return (
    <TableLayout title='Invoices' count={count}>
      <div className='my-5'>
        <InvoicesTable invoices={invoices} count={count} isLoading={isLoading} />
      </div>
    </TableLayout>

  )
}

export default DashboardInvoices