import { Outlet } from "react-router-dom"
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header.tsx'
import ResponsiveBottomNavbar from '../components/responsiveBottomNav/ResponsiveBottomNav.tsx'
import { WindowWidthContext } from "../components/features/WindowWidthFeature/WindowWidthProvider.tsx"
import { useContext } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from "../components/features/ThemeFeature/ThemeProvider.tsx"

function Layout() {
  const { windowWidth } = useContext(WindowWidthContext)
  const { theme } =useContext(ThemeContext)
  return (
    <>
        <ToastContainer theme={`${theme == "dark" ? "dark" : "light"}`} />
        <div className='w-full min-h-screen'>
          <Header />
          <div className="scr" style={{
            paddingTop: `${windowWidth < 768 ? "75px" : ""}`
          }}></div>
            <Outlet  />
          <Footer />
          <ResponsiveBottomNavbar />
        </div>
    </>
  )
}

export default Layout