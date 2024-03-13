import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import MyOrdersItem from './MyOrdersItem';


function OldOrdersTable() {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <div className='grid grid-cols-10 py-2 border-b opacity-70 font-semibold text-left w-full px-6 gap-x-5' style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      }}>
        <h4 className='col-span-2'>Order ID</h4>
        <h4 className='col-span-2'>Date</h4>
        <h4 className='col-span-2'>Price</h4>
        <h4 className='col-span-2'>Status</h4>
      </div>
      <div className='text-black my-3 flex flex-col gap-y-3'>
        <MyOrdersItem OrderID={'#874522648'} Date={'September 5, 2020'} Status={'Paid'} Price={218.50} />
        <MyOrdersItem OrderID={'#874522648'} Date={'September 5, 2020'} Status={'Paid'} Price={218.50} />
        <MyOrdersItem OrderID={'#874522648'} Date={'September 5, 2020'} Status={'Paid'} Price={218.50} />
        <MyOrdersItem OrderID={'#874522648'} Date={'September 5, 2020'} Status={'Paid'} Price={218.50} />
      </div>

    </div>
  )
}

export default OldOrdersTable