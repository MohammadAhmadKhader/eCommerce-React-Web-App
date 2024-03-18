import WebsiteLogo from "../shared/WebsiteLogo.tsx";
import SearchComponent from "./headerComponents/SearchComponent.tsx";
import { useContext } from "react";
import ShortWebSiteLogo from "../shared/ShortWebSiteLogo.tsx";
import { Link } from "react-router-dom";
import { ThemeContext } from "../features/ThemeFeature/ThemeProvider.tsx";
import { WindowWidthContext } from "../features/WindowWidthFeature/WindowWidthProvider.tsx";
import HeartIcon from '../shared/HeartIcon.tsx';
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { UserContext } from "../features/UserFeature/UserProvider.tsx";
import { MdLogin } from 'react-icons/md'
import { IoPersonAdd } from "react-icons/io5";
import OneLineSkeleton from "../shared/LoadingSkeletons/OneLineSkeleton.tsx";
import { GoDotFill } from "react-icons/go";
import { CartContext } from "../features/CartFeature/CartProvider.tsx";
import { GlobalCachingContext } from "../features/GlobalCachingContext/GlobalCachingProvider.tsx";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';



function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { windowWidth } = useContext(WindowWidthContext)
  const { userData, isUserFetchDataLoading } = useContext(UserContext)
  const { cartItems }: any = useContext(CartContext)
  const { categories, isCategoriesLoading } = useContext(GlobalCachingContext)


  return (

    <header className="fixed left-0 top-0 z-50 md:static header min-h-14 w-full py-2 border-solid border-b"
      style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        backgroundColor: theme == "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
      }}>

      <div className="flex justify-between mx-3">

        <div className="flex items-center justify-between w-full">
          <div className="flex w-fit">
            <h1 className="overflow-hidden flex">
              <Link className="h-12 mr-4" to="/">
                {windowWidth > 768 ? <WebsiteLogo /> : <ShortWebSiteLogo />}
              </Link>
            </h1>
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center gap-x-2 font-semibold">

                {isCategoriesLoading ? <div className="flex justify-center items-center mx-4">
                  <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"250px"} />
                </div>
                  :
                  categories?.map((category) => {
                    return (
                      <li key={category._id} className="opacity-100 duration-300 hover:opacity-75">
                        <Link to={`/products?page=1&limit=9&category=${category._id}`}>
                          {category.name}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </nav>
          </div>

          <SearchComponent />
        </div>

        {isUserFetchDataLoading ?
          <div className="flex justify-center items-center mx-4">
            <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"150px"} />
          </div> :
          <>
            {userData && <div className="hidden lg:flex items-center ms-4 gap-x-2.5">
              <Link title="Wishlist" to="/profile/wishlist" className="hidden md:block">
                <HeartIcon height={25} width={25} />
              </Link>
              <Link title="Cart" to="/cart" className="hidden md:block">
                <div className="opacity-70 duration-300 hover:opacity-100 relative">
                  <BsCart size={25} />

                  {cartItems?.length > 0 && <div className="absolute -right-1 -top-3">
                    <GoDotFill color="red" size={30} />
                    <span className="absolute right-[12px] top-[5px] text-[11px] font-semibold text-white">
                      {cartItems.length}
                    </span>
                  </div>
                  }
                </div>
              </Link>
              <Link title="Profile" to="/profile" className="hidden md:block">
                <div className="opacity-70 duration-300 hover:opacity-100">
                  <CgProfile size={25} />
                </div>
              </Link>
            </div>}

            {!userData &&
              <div className="hidden lg:flex items-center ms-4 gap-x-2.5">
                <Link to="/signup" className="hidden md:block">
                  <Tooltip title="Sign Up">
                    <div className="opacity-70 duration-300 hover:opacity-100">
                      <IoPersonAdd size={25} />
                    </div>
                  </Tooltip>
                </Link>
                <Link to="/login" className="hidden md:block">
                  <Tooltip title="Login">
                    <div className="opacity-70 duration-300 hover:opacity-100">
                      <MdLogin size={25} />
                    </div>
                  </Tooltip>
                </Link>
              </div>
            }
            <div className="flex items-center ms-3">
              <button className="rounded-md bg-black" onClick={toggleTheme} style={{
                backgroundColor: "transparent"
              }}>
                {
                  theme == "dark" ?
                    <Tooltip title="Switch To Light Mode">
                      <span>
                        <MdLightMode size={25} />
                      </span>
                    </Tooltip>
                    :
                    <Tooltip title="Switch To Dark Mode">
                      <span>
                        <MdDarkMode size={25} />
                      </span>
                    </Tooltip>
                }
              </button>
            </div>
          </>
        }
      </div>
    </header>
  )
}

export default Header