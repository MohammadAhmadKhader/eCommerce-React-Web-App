import { GoChevronRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IMyOrdersItem } from '../../../types/types'

function MyOrdersItem({ OrderID, Date: orderDate, Price, IsPaid }: IMyOrdersItem) {
    return (
        <div className='grid grid-cols-10 items-center w-full px-4 py-6 bg-color-secondaryTabs rounded-lg gap-x-5'>
            <p className='col-span-3 font-semibold text-sm'>
                #{OrderID}
            </p>
            <p className='col-span-2 font-semibold text-sm'>
                {new Date(`${orderDate}`).toLocaleString()}
            </p>
            <p className='col-span-2 font-semibold text-sm'>
                ${Price.toFixed(2)}
            </p>
            <p className='text-color-accent col-span-2 font-semibold text-sm'>
                {IsPaid ? "Paid" : "Not Paid"}
            </p>
            <p className='col-span-1'>
                <Link to={`/profile/orders/${OrderID}`}>
                    <GoChevronRight size={18} />
                </Link>
            </p>
        </div>
    )
}

export default MyOrdersItem