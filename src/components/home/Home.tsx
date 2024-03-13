import { useContext, useEffect, useState } from 'react'
import CarouselSwiper from "../singleProduct/SingleProductPageComponents/CarouselSwiper";
import ReactSwitch from 'react-switch';
import { Suspense } from 'react';
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider';
import MainCarousel from './HomeComponents/MainCarousel';
import ImageAccessories from "./HomeComponents/Imgs/f773c7f03ea20627fb888ab56d2cdf88.jfif"
import HandbagsImage from "./HomeComponents/Imgs/Handbags.jpg"
import SkincareImage from "./HomeComponents/Imgs/skincare.png"
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Brands from '../brands/Brands';
import HandPickedCollections from '../handPickedCollections/HandPickedCollections';
import ResponsiveTopCategories from '../responsiveTopCategories/ResponsiveTopCategories';
import Skeleton from "../shared/LoadingSkeletons/Skeleton";
import ProductsPageSkeleton from '../shared/LoadingSkeletons/ProductsPageSkeleton';
import useAxios from '../customHooks/useAxios';

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { GET : getRequestNewArrivals, isLoading : isNewArrivalsLoading ,setIsLoading : setIsNewArrivalsLoading } = useAxios()
  const [newArrivals,setNewArrivals] = useState([]);
 
  const getNewArrivals = async()=>{
    const {data} = await getRequestNewArrivals("/products?page=1&limit=7&sort=newArrivals_desc")
    setIsNewArrivalsLoading(false)
    setNewArrivals(data.products)
    console.log(data.products)
  }

  useEffect(() => {
    getNewArrivals()
  }, [])

  const tempData = [
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 34.54
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 34.54
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 14.24
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 134.34
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 213.32
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 114.54
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 97.30
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 34.54
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 34.54
    },
    {
      id: `${Math.floor((Math.random() * 1000) + 1)}`,
      Title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe eum quisquam maiores temporibus enim odit vitae corporis perspiciatis, illo ex.",
      Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis illo laboriosam dolorem velit animi sint quam aperiam repudiandae possimus debitis alias modi maiores voluptatem et harum porro eveniet, accusantium minus error omnis incidunt deleniti tempora. Cum recusandae dolores praesentium dolore, adipisci facilis incidunt voluptatem odit sed tenetur, nobis deleniti rerum.",
      ImgUrl: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
      Price: 4.20
    },
  ]

  return (
    <div className='home'>
      <div className='grid grid-cols-12 gap-x-2 sm:gap-x-6 lg:gap-x-12 p-4'>
        <div className='col-span-12'>
          <MainCarousel />
        </div>
      </div>


      <ResponsiveTopCategories />

      <div className='my-5'>
        <h2 className='text-xl font-semibold md:text-2xl lg:text-3xl md:font-bold ps-3 mb-5'>
          New Arrivals
        </h2>
        <div className='px-5 my-5'>

          {isNewArrivalsLoading ? <Skeleton /> : <CarouselSwiper Iterable={newArrivals} />}
        </div>
      </div>

      <div>
        <div className='my-5'>
          <h2 className='text-xl font-semibold md:text-2xl lg:text-3xl md:font-bold ps-3 mb-5'>Top Rated Products</h2>

          <div className='px-5 my-5'>
            <CarouselSwiper Iterable={tempData} />
          </div>
        </div>
      </div>
      <HandPickedCollections />
      <Brands />

      <div>
        <div className='px-5 flex' style={{ aspectRatio: "16/5" }}>
          <div className='rounded-xl w-full min-h-44 sm:min-h-60 md:h-full bg-cover bg-no-repeat bg-center relative' style={{
            backgroundImage: `url(${ImageAccessories})`
          }}>
            <div className='absolute px-8 left-0 top-1/2 -translate-y-1/2'>

              <h4 className='text-amber-900 text-xl md:text-3xl tracking-wider	'>
                LIFESTYLE
              </h4>
              <h4 className='text-amber-900 text-xl sm:text-2xl md:text-4xl xl:text-6xl font-bold'>
                Makeup Accessories <br />from Top Brands
              </h4>

            </div>

          </div>
        </div>

        <div className='px-5 grid grid-cols-12 gap-x-6 mt-5 gap-y-5'>
          <div className='rounded-xl col-span-12 lg:col-span-6 w-full bg-cover bg-no-repeat bg-center relative'
            style={{ aspectRatio: "16/7", backgroundImage: `url(${SkincareImage})` }}>

            <div className='absolute p-3 md:p-9 right-0 flex flex-col justify-between h-full text-pink-800'>
              <h4 className='text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-right'>Skincare <br /> Essentials</h4>

              <Link to="" className='ms-auto p-1 rounded-full opacity-80 hover:opacity-100 duration-300 hover:cursor-pointer bg-white'>
                <FaArrowRight className='sm:size-7 lg:size-10' />
              </Link>
            </div>
          </div>

          <div className='rounded-xl col-span-12 lg:col-span-6 w-full bg-cover bg-no-repeat bg-center relative'
            style={{ aspectRatio: "16/7", backgroundImage: `url(${HandbagsImage})` }} >
            <div className='absolute p-3 md:p-9 right-0 flex flex-col justify-between h-full text-sky-800'>
              <h4 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold'>Handbags</h4>

              <Link to="" className='ms-auto p-1 rounded-full opacity-80 hover:opacity-100 duration-300 hover:cursor-pointer bg-white'>
                <FaArrowRight className='sm:size-7 lg:size-10' />
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div>
        <ReactSwitch handleDiameter={25} width={45}
          height={20} checked={theme == "dark"} onChange={toggleTheme} />
      </div>

    </div>
  )
}

export default Home