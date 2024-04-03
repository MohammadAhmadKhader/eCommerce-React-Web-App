import { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram, FaChevronRight } from "react-icons/fa";
import FooterContactsLinks from './FooterComponents/FooterContactsLinks';
import { CiLocationOn } from "react-icons/ci";
import FooterNavLinkComponents from './FooterComponents/FooterNavLinkComponents';
import { WindowWidthContext } from '../features/WindowWidthFeature/WindowWidthProvider';
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider';
import OneLineSkeleton from '../shared/LoadingSkeletons/OneLineSkeleton';
import FooterDivider from './FooterComponents/FooterDivider';



function Footer() {
  const { theme } = useContext(ThemeContext);
  const { categories, isCategoriesLoading } = useContext(GlobalCachingContext);

  return (
    <footer className='flex justify-between w-full border-t border-white border-opacity-10 border-solid py-5
    flex-wrap lg:flex-nowrap pb-[73px] md:pb-0 lg:pb-[73px]'
      style={{
        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"
      }}>

      <div className='px-1.5 md:px-10 w-full lg:w-auto'>
        <nav className='flex mb-7 w-full lg:w-auto justify-between flex-col md:flex-row lg:mb-0 lg:gap-x-20'>
          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                Shop by Category
              </h5>

              <div className={`flex flex-col gap-y-2 duration-300`}>
                {!isCategoriesLoading ? categories.map((category) => {

                  return (
                    <FooterNavLinkComponents
                      key={category._id + "home"}
                      Href={`/products?page=1&limit=9&category=${category._id}`}
                      text={category.name} />
                  )
                })
                  : <div className='flex flex-col gap-y-4 mt-2'>
                    <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                    <OneLineSkeleton forceMinHeight={"20px"} forceMinWidth={"200px"} />
                  </div>
                }
              </div>
            </li>
          </ul>

          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                About</h5>
              <div className={`flex md:flex-col flex-wrap gap-y-2 overflow-hidden duration-300`}>
                <FooterNavLinkComponents Href={'/contactus'} text={'Contact Us'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/aboutus'} text={'About Us'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Careers'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Press'} />
              </div>
            </li>
          </ul>

          <ul>
            <li className='flex flex-col gap-y-2 mb-5 lg:mb-0'>
              <h5 className='mb-1.5 opacity-100 flex items-center gap-x-2'>
                Policy</h5>
              <div className={`flex md:flex-col flex-wrap gap-y-2 overflow-hidden duration-300 `}>
                <FooterNavLinkComponents Href={'/'} text={'Return Policy'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Terms Of Use'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Sitemap'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Security'} />
                <FooterDivider />
                <FooterNavLinkComponents Href={'/'} text={'Privacy'} />
                <FooterDivider />
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