import React from 'react'

function OrderCalcs() {
  return (
    <ul className='flex flex-col gap-y-3 my-4'>
          <li className='flex items-center justify-between'>
            <h4>SubTotal</h4>
            <span className='font-bold'>$120.34</span>
          </li>

          <li className='flex items-center justify-between'>
            <h4>Discount</h4>
            <span className='font-bold'>$120.34</span>
          </li>

          <li className='flex items-center justify-between'>
            <h4>DeliveryFee</h4>
            <span className='font-bold'>$120.34</span>
          </li>

          <li className='flex items-center justify-between'>
            <h4 className='font-bold'>GrandTotal</h4>
            <span className='font-bold'>$120.34</span>
          </li>
    </ul>
  )
}

export default OrderCalcs