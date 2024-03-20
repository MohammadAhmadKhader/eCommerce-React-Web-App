import { Link } from 'react-router-dom';
import { ICheckoutProcessStepper } from '../../../types/types';

function CheckoutProcessStepper({setCheckoutSteps} : ICheckoutProcessStepper ) {
  return (
    <div>
        <div className='flex justify-between items-center my-5'>
            <Link className='underline text-color-accent' to="/cart">
                Back to Cart
            </Link>
            <button onClick={()=>{
              setCheckoutSteps(2)
            }}
                className='text-white bg-color-accent rounded-md px-12 py-1.5 duration-300 hover:bg-transparent 
                hover:text-color-accent border border-color-accent'>
                Next
            </button>
        </div>
    </div>
  )
}

export default CheckoutProcessStepper