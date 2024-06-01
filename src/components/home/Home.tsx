import { useContext, useEffect, useRef, useState } from 'react'
import CarouselSwiper from "../singleProduct/SingleProductPageComponents/CarouselSwiper";
import MainCarousel from './HomeComponents/MainCarousel';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Brands from '../brands/Brands';
import HandPickedCollections from '../handPickedCollections/HandPickedCollections';
import ResponsiveTopCategories from '../responsiveTopCategories/ResponsiveTopCategories';
import Skeleton from "../shared/LoadingSkeletons/Skeleton";
import useAxios from '../../customHooks/useAxios';
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider';
import { toast } from 'react-toastify';

function Home() {
  const { GET: getRequestNewArrivals, isLoading: isNewArrivalsLoading, setIsLoading: setIsNewArrivalsLoading } = useAxios()
  const [newArrivals, setNewArrivals] = useState([]);
  const initialLoader = useRef(null)


  const getNewArrivals = async () => {
    const { data } = await getRequestNewArrivals("/products?page=1&limit=7&sort=newArrivals_desc")
    setNewArrivals(data.products)
    setIsNewArrivalsLoading(false)
    console.log(data.products)
  }
  const { getBrands, getTopRatedProducts, topRatedProducts, isTopRatedProductsLoading, loadingMessage } = useContext(GlobalCachingContext)

  useEffect(() => {
    getTopRatedProducts()
    getBrands()
    getNewArrivals();


  }, [])

  useEffect(() => {
    if (loadingMessage) {
      initialLoader.current = toast.loading(`The project backend is deployed on render free service 
      therefore will take 50s - 2mins to boot the backend service on first request`, {
        position: "top-center"
      })
    } else {
      toast.dismiss(initialLoader.current)
    }
  }, [loadingMessage])

  return (
    <section className='home mb-5'>
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
            {isTopRatedProductsLoading ? <Skeleton /> : <CarouselSwiper Iterable={topRatedProducts} />}
          </div>
        </div>
      </div>
      <HandPickedCollections />
      <Brands />

      <div>
        <div className='px-5 flex' style={{ aspectRatio: "16/5" }}>
          <div className='rounded-xl w-full min-h-44 sm:min-h-60 md:h-full bg-cover bg-no-repeat bg-center relative' style={{
            backgroundImage: `url(https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/esmz1k45qirmuhbrl9vv)`
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
            style={{ aspectRatio: "16/7", backgroundImage: `url(https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/opm6tv5h01ldifwcuomn)` }}>

            <div className='absolute p-3 md:p-9 right-0 flex flex-col justify-between h-full text-pink-800'>
              <h4 className='text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-right'>Skincare <br /> Essentials</h4>

              <Link to="/products?page=1&limit=9&category=65e7d89b62bb29693a0d1c58" className='ms-auto p-1 rounded-full opacity-80 hover:opacity-100 duration-300 hover:cursor-pointer bg-white'>
                <FaArrowRight className='sm:size-7 lg:size-10' />
              </Link>
            </div>
          </div>

          <div className='rounded-xl col-span-12 lg:col-span-6 w-full bg-cover bg-no-repeat bg-center relative'
            style={{ aspectRatio: "16/7", backgroundImage: `url(https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/dx5xm29irfnmisaiwvtb)` }} >
            <div className='absolute p-3 md:p-9 right-0 flex flex-col justify-between h-full text-sky-800'>
              <h4 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold'>Handbags</h4>

              <Link to="/products?page=1&limit=9&category=65e7d89c62bb29693a0d1c5b" className='ms-auto p-1 rounded-full opacity-80 hover:opacity-100 duration-300 hover:cursor-pointer bg-white'>
                <FaArrowRight className='sm:size-7 lg:size-10' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home