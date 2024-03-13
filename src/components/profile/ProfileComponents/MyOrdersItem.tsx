import { GoChevronRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { IMyOrdersItem } from '../../../types/types'

function MyOrdersItem({ OrderID, Date, Price, Status }: IMyOrdersItem) {
    return (
        <div className='grid grid-cols-10 items-center w-full px-4 py-6 bg-color-secondaryTabs rounded-lg gap-x-5'>
            <p className='col-span-2'>
                {OrderID}
            </p>
            <p className='col-span-2'>
                {Date}
            </p>
            <p className='col-span-2'>
                ${Price}
            </p>
            <p className='text-color-accent col-span-2'>
                {Status}
            </p>
            <p className='col-span-2'>
                <Link to="/profile/orders/1">
                    <GoChevronRight size={20} />
                </Link>
            </p>
        </div>
    )
}

export default MyOrdersItem