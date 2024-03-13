import { useContext } from 'react'
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCart } from 'react-icons/bs';
import { MdOutlineCategory } from "react-icons/md";
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import ResponsiveNavLinkComponent from './ResponsiveNavLinkComponent';
import { UserContext } from '../features/UserFeature/UserProvider';
import OneLineSkeleton from '../shared/LoadingSkeletons/OneLineSkeleton';
import { MdLogin } from 'react-icons/md'
import { IoPersonAdd } from "react-icons/io5";

function ResponsiveBottomNav() {
    const { theme } = useContext(ThemeContext)
    const { userData, isUserFetchDataLoading } = useContext(UserContext)
    return (
        <div>
            <nav className='md:hidden fixed bottom-0 left-0 w-full z-50 border-t py-2' style={{
                backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"

            }}>
                <ul className='flex px-4 justify-between items-center'>
                    {isUserFetchDataLoading ?

                        <div className='w-full flex justify-center items-center'>
                            <OneLineSkeleton forceMinHeight={"25px"} forceMinWidth={"90%"} />
                        </div> :
                        <>
                            <ResponsiveNavLinkComponent IconComponent={AiFillHome} Text={"Home"} Href="/" />
                            <ResponsiveNavLinkComponent IconComponent={MdOutlineCategory} Text={"Categories"} Href="/products" />
                            {userData && <ResponsiveNavLinkComponent IconComponent={CgProfile} Text={"Profile"} Href="/profile" />}
                            {userData && <ResponsiveNavLinkComponent IconComponent={BsCart} Text={"Cart"} Href="/cart" />}
                            {!userData && <ResponsiveNavLinkComponent IconComponent={MdLogin} Text={"Login"} Href="/login" />}
                            {!userData && <ResponsiveNavLinkComponent IconComponent={IoPersonAdd} Text={"Sign up"} Href="/signup" />}
                        </>

                    }
                </ul>
            </nav>
        </div>
    )
}

export default ResponsiveBottomNav