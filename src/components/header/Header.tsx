import WebsiteLogo from "../shared/WebsiteLogo.tsx";
import SearchComponent from "./headerComponents/SearchComponent.tsx";
import { useContext, useState } from "react";
import ShortWebSiteLogo from "../shared/ShortWebSiteLogo.tsx";
import { Link } from "react-router-dom";
import { ThemeContext } from "../features/ThemeFeature/ThemeProvider.tsx";
import { WindowWidthContext } from "../features/WindowWidthFeature/WindowWidthProvider.tsx";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { UserContext } from "../features/UserFeature/UserProvider.tsx";
import { MdLogin } from 'react-icons/md'
import { IoPersonAdd } from "react-icons/io5";
import OneLineSkeleton from "../shared/LoadingSkeletons/OneLineSkeleton.tsx";
import { GoDotFill } from "react-icons/go";
import { CartContext } from "../features/CartFeature/CartProvider.tsx";
import { GlobalCachingContext } from "../features/GlobalCachingContext/GlobalCachingProvider.tsx";
import Tooltip from '@mui/material/Tooltip';
import { Menu } from "@mui/joy";
import Drawer from "./headerComponents/Drawer.tsx"

function Header() {
  const { theme } = useContext(ThemeContext);
  const { windowWidth } = useContext(WindowWidthContext)
  const { userData, isUserFetchDataLoading } = useContext(UserContext)
  const { cartItems }: any = useContext(CartContext)
  const { categories, isCategoriesLoading } = useContext(GlobalCachingContext)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 md:static header min-h-14 w-full py-2 border-solid border-b"
      style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        backgroundColor: theme == "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
      }}>

      <div className="flex justify-between mx-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-fit">
            <Menu onClick={() => {
              setIsOpen(prevState => !prevState);
            }} />
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
            <h1 className="overflow-hidden flex">
              <Link className="h-12 mr-2" to="/">
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
              <Link title="Cart" to="/cart" className="hidden md:block">
                <div className="opacity-70 duration-300 hover:opacity-100 relative">
                  <BsCart size={25} />

                  {cartItems?.length > 0 && <div className="absolute -right-1 -top-3.5">
                    <GoDotFill color="red" size={31} />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 
                     -translate-y-1/2 text-[11px] font-bold text-white">
                      {cartItems.length}
                    </span>
                  </div>
                  }
                </div>
              </Link>
              <Link title="Profile" to="/profile/information" className="hidden md:block">
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

          </>
        }
      </div>

    </header>
  )
}

export default Header