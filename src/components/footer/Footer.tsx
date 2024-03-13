import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram, FaChevronRight } from "react-icons/fa";
import FooterContactsLinks from './FooterComponents/FooterContactsLinks';
import { CiLocationOn } from "react-icons/ci";
import FooterNavLinkComponents from './FooterComponents/FooterNavLinkComponents';
import { WindowWidthContext } from '../features/WindowWidthFeature/WindowWidthProvider';



function Footer() {
  const { theme } = useContext(ThemeContext)
  const { windowWidth } = useContext(WindowWidthContext)

  const [isOpenFooterListFirst, setIsOpenFooterListFirst] = useState(true)
  const [firstElementHeight, setFirstElementHeight] = useState(null)
  const firstList = useRef<HTMLDivElement | null>(null)
  const [isOpenFooterListSecond, setIsOpenFooterListSecond] = useState(true)
  const [secondElementHeight, setSecondElementHeight] = useState(null)
  const secondList = useRef<HTMLDivElement | null>(null)
  const [isOpenFooterListThird, setIsOpenFooterListThird] = useState(true)
  const [thirdElementHeight, setThirdElementHeight] = useState(null)
  const thirdList = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (windowWidth >= 1024) {
      setIsOpenFooterListFirst(true)
      firstList?.current?.classList.remove("h-0!")

      setIsOpenFooterListSecond(true)
      secondList?.current?.classList.remove("h-0!")

      setIsOpenFooterListThird(true)
      thirdList?.current?.classList.remove("h-0!")
    }
  }, [windowWidth])


  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setFirstElementHeight(firstList?.current?.getBoundingClientRect().height)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSecondElementHeight(secondList?.current?.getBoundingClientRect().height)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setThirdElementHeight(thirdList?.current?.getBoundingClientRect().height)
  }, [])

  return (
    <footer className='flex justify-between w-full border-t border-white border-opacity-10 border-solid py-5
    flex-wrap lg:flex-nowrap'
      style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
        paddingBottom: `${windowWidth < 768 ? "73px" : ""}`
      }}>

      <div className='px-1.5 md:px-10 w-full lg:w-auto'>
        <nav className='flex mb-7 w-full lg:w-auto justify-between flex-col lg:flex-row lg:mb-0 lg:gap-x-20'>
          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                <FaChevronRight size={15} className={`block lg:hidden duration-300 hover:cursor-pointer ${isOpenFooterListFirst && windowWidth < 1024 ? "rotate-90" : "rotate-0"}`} onClick={() => {
                  setIsOpenFooterListFirst(prevState => !prevState)
                }} />
                Shop by Category
              </h5>

              <div ref={firstList} className={`flex flex-col gap-y-2 overflow-hidden duration-300`} style={{
                // client height for an element + gap from class ( gap-y-2 ) * # of elements
                height: `${isOpenFooterListFirst ? `${firstElementHeight}px` : "0px"}`
              }}>
                <FooterNavLinkComponents Href={'/'} text={'Skincare'} />
                <FooterNavLinkComponents Href={'/'} text={'Personal Care'} />
                <FooterNavLinkComponents Href={'/'} text={'Handbags'} />
                <FooterNavLinkComponents Href={'/'} text={'Watches'} />
                <FooterNavLinkComponents Href={'/'} text={'Eye wear'} />
              </div>
            </li>
          </ul>

          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                <FaChevronRight size={15} className={`block lg:hidden duration-300 hover:cursor-pointer ${isOpenFooterListSecond && windowWidth < 1024 ? "rotate-90" : "rotate-0"}`} onClick={() => {
                  setIsOpenFooterListSecond(prevState => !prevState)
                }} />
                About</h5>
              <div ref={secondList} className={`flex flex-col gap-y-2 overflow-hidden duration-300`} style={{
                // client height for an element + gap from class ( gap-y-2 ) * # of elements
                height: `${isOpenFooterListSecond ? `${secondElementHeight}px` : "0px"}`
              }}>
                <FooterNavLinkComponents Href={'/contactus'} text={'Contact Us'} />
                <FooterNavLinkComponents Href={'/aboutus'} text={'About Us'} />
                <FooterNavLinkComponents Href={'/'} text={'Careers'} />
                <FooterNavLinkComponents Href={'/'} text={'Press'} />
              </div>
            </li>
          </ul>

          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                <FaChevronRight size={15} className={`block lg:hidden duration-300 hover:cursor-pointer ${isOpenFooterListThird && windowWidth < 1024 ? "rotate-90" : "rotate-0"}`} onClick={() => {
                  setIsOpenFooterListThird(prevState => !prevState)
                }} />
                Policy</h5>
              <div ref={thirdList} className={`flex flex-col gap-y-2 overflow-hidden duration-300 `} style={{
                // client height for an element + gap from class ( gap-y-2 ) * # of elements
                height: `${isOpenFooterListThird ? `${thirdElementHeight}px` : "0px"}`
              }}>
                <FooterNavLinkComponents Href={'/'} text={'Return Policy'} />
                <FooterNavLinkComponents Href={'/'} text={'Terms Of Use'} />
                <FooterNavLinkComponents Href={'/'} text={'Sitemap'} />
                <FooterNavLinkComponents Href={'/'} text={'Security'} />
                <FooterNavLinkComponents Href={'/'} text={'Privacy'} />
                <FooterNavLinkComponents Href={'/'} text={'EPR Compliance'} />
              </div>
            </li>
          </ul>
        </nav>
      </div>


      <div className='px-1.5 md:px-10 border-t border-opacity-10 border-white w-full py-5 lg:border-none lg:w-auto lg:py-0'>
        <ul className='flex justify-start lg:justify-end gap-x-4'>
          <FooterContactsLinks Href='/' Size={20} LogoComponent={FaFacebookF} />
          <FooterContactsLinks Href='/' Size={20} LogoComponent={FaInstagram} />
          <FooterContactsLinks Href='/' Size={20} LogoComponent={FaTwitter} />
          <FooterContactsLinks Href='/' Size={20} LogoComponent={FaYoutube} />
        </ul>

        <div className='w-full flex items-center justify-start lg:justify-end my-4 gap-x-2'>
          <CiLocationOn size={30} />
          <span>
            Palestine
          </span>
        </div>

        <div>
          &#169; 2024 | Made by <span className='text-amber-500 font-semibold'>Mohammad Khader</span>
        </div>
        <div>
        </div>
      </div>
    </footer>
  )
}

export default Footer