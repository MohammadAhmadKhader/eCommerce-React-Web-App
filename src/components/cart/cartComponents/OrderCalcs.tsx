import { useEffect } from 'react'

function OrderCalcs({ grandTotal, discount, subTotal, deliveryFee }) {

  useEffect(() => {

  }, [])

  return (
    <ul className='flex flex-col gap-y-3 my-4'>
      <li className='flex items-center justify-between'>
        <h4>SubTotal</h4>
        <span className='font-bold'>${subTotal?.toFixed(2)}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4>Discount</h4>
        <span className='font-bold'>${discount?.toFixed(2)}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4>DeliveryFee</h4>
        <span className='font-bold'>${deliveryFee?.toFixed(2)}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4 className='font-bold'>GrandTotal</h4>
        <span className='font-bold'>${grandTotal?.toFixed(2)}</span>
      </li>
    </ul>
  )
}

export default OrderCalcs