import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { IStarsComponent } from '../../types/types'

function StarsComponent({size = 22} : IStarsComponent) {
  return (
    <div className='flex overflow-hidden relative'>
        <IoIosStarOutline className='stars-color' size={size} />
        <IoIosStarOutline className='stars-color' size={size} />
        <IoIosStarOutline className='stars-color' size={size} />
        <IoIosStarOutline className='stars-color' size={size} />
        <IoIosStarOutline className='stars-color' size={size} />

        <div className='flex absolute left-0 top-0 overflow-hidden'>
            <IoIosStar size={size} className='flex-shrink-0 stars-color' />
            <IoIosStar size={size} className='flex-shrink-0 stars-color' />
            <IoIosStar size={size} className='flex-shrink-0 stars-color' />
            <IoIosStar size={size} className='flex-shrink-0 stars-color' />
            <IoIosStar size={size} className='flex-shrink-0 stars-color' />
        </div>
    </div>
  )
}

export default StarsComponent
