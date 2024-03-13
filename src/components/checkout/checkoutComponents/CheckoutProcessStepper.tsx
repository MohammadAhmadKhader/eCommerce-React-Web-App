import React from 'react'
import { Link } from 'react-router-dom';
import { ICheckoutProcessStepper } from '../../../types/types';

function CheckoutProcessStepper({NextStep = "/"} : ICheckoutProcessStepper ) {
  return (
    <div>
        <div className='flex justify-between items-center my-5'>
            <Link className='underline text-color-accent' to="/cart">
                Back to Cart
            </Link>
            <Link to={NextStep}
                className='text-white bg-color-accent rounded-md px-12 py-1.5 duration-300 hover:bg-transparent hover:text-color-accent border border-color-accent'>
                Next
            </Link>
        </div>
    </div>
  )
}

export default CheckoutProcessStepper