import  { useContext } from 'react'
import { Link } from 'react-router-dom'
import StarsComponent from '../../shared/StarsComponent'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { MdOutlineCancel } from "react-icons/md";
import { IMyWishListItem } from '../../../types/types';

function MyWishListItem({imgUrl,name} : IMyWishListItem) {
  const { theme } = useContext(ThemeContext)
  return (
    <Link className='col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col rounded-lg border relative' to="/" style={{
      backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
      borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
      color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
  }}>
      <div>
          <img src={imgUrl} alt={name} className='rounded-t-md' />
      </div>
      <div className='py-2 px-3'>
          <div>
              <h4 className='text-md font-semibold'>{name}</h4>
          </div>
          <div>
              <StarsComponent />
          </div>
      </div>

      <div className='absolute -right-2 -top-2'>
          <button className='text-red-600 rounded-full bg-black' style={{
              backgroundColor: theme == "dark" ? "var(--light--bgCard-color)" : "var(--dark--bgCard-color)",
          }}>
              <MdOutlineCancel size={25} />
          </button>
      </div>
  </Link>
  )
}

export default MyWishListItem