import WebsiteLogo from "../shared/WebsiteLogo.tsx";
import SearchComponent from "./headerComponents/SearchComponent.tsx";
import { useContext } from "react";
import ShortWebSiteLogo from "../shared/ShortWebSiteLogo.tsx";
import { Link } from "react-router-dom";
import { ThemeContext } from "../features/ThemeFeature/ThemeProvider.tsx";
import { WindowWidthContext } from "../features/WindowWidthFeature/WindowWidthProvider.tsx";
import HeartIcon from '../shared/HeartIcon';
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { UserContext } from "../features/UserFeature/UserProvider.tsx";
import { MdLogin } from 'react-icons/md'
import { IoPersonAdd } from "react-icons/io5";
import OneLineSkeleton from "../shared/LoadingSkeletons/OneLineSkeleton.tsx";


function Header() {
  const { theme } = useContext(ThemeContext);
  const { windowWidth } = useContext(WindowWidthContext)
  const { userData, userToken, isUserFetchDataLoading } = useContext(UserContext)


  const categories = {
    "message": "success",
    "count": 5,
    "categories": [
      {
        "id": 1,
        "name": "Skincare",
        "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035673/eCommerceTap/Categories/ypycq2m497dhga7umjhfSkincare.svg"
      },
      {
        "id": 2,
        "name": "Watches",
        "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035742/eCommerceTap/Categories/zood7r05af5otd2qbczlWatches.svg"
      },
      {
        "id": 3,
        "name": "Jewellery",
        "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035610/eCommerceTap/Categories/bl1jpdtswba46sasy12pJewellery.svg"
      },
      {
        "id": 4,
        "name": "Handbags",
        "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035726/eCommerceTap/Categories/aolvbrqkj1xjh48csyotHandbags.svg"
      },
      {
        "id": 5,
        "name": "Eyewear",
        "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035673/eCommerceTap/Categories/ypycq2m497dhga7umjhfSkincare.svg"
      }
    ]
  }

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
                {categories.categories.map((category) => {
                  return (
                    <li key={category.id} className="opacity-100 duration-300 hover:opacity-75">
                      <Link to={`/products?page=1&limit=9&category=${category.id}`}>
                        {category.name}
                      </Link>
                    </li>
                  )
                })}

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
            {userToken && userData && <div className="hidden lg:flex items-center ms-4 gap-x-2.5">
              <Link title="Wishlist" to="/profile/wishlist" className="hidden md:block">
                <HeartIcon height={25} width={25} />
              </Link>
              <Link title="Cart" to="/cart" className="hidden md:block">
                <div className="opacity-70 duration-300 hover:opacity-100">
                  <BsCart size={25} />
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
                <Link title="Sign Up" to="/signup" className="hidden md:block">
                  <div className="opacity-70 duration-300 hover:opacity-100">
                    <IoPersonAdd size={25} />
                  </div>
                </Link>
                <Link title="Login" to="/login" className="hidden md:block">
                  <div className="opacity-70 duration-300 hover:opacity-100">
                    <MdLogin size={25} />
                  </div>
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