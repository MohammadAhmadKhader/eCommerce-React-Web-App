import "./profile.css"
import ProfileAsideOptions from './ProfileComponents/ProfileAsideOptions'
import ResponsiveAside from "./ProfileComponents/ResponsiveAside";
import LogoutButton from "./ProfileComponents/LogoutButton";
import { Link, Outlet } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";


function Profile() {

  return (
    <section className='px-1 sm:px-4 profile'>
      <div className='px-2 md:px-0 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
        <Link to="/">
          Home
        </Link>
        <IoChevronForwardOutline />
        <Link to="/profile">
          User Profile
        </Link>
      </div>
      <div className='flex justify-between items-center text-color-accent my-5 px-2 md:px-0 '>
        <h2 className='text-2xl sm:text-3xl xl:text-5xl font-semibold'>
          Profile
        </h2>


        <LogoutButton />
        <div className='block md:hidden'>
          <ResponsiveAside />
        </div>
      </div>

      <div className='grid grid-cols-12 md:gap-x-1 lg:gap-x-4 my-5'>
        <div className='col-span-3 hidden md:block'>
          <ProfileAsideOptions />
        </div>

        <div className='col-span-12 md:col-span-9 px-2'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Profile