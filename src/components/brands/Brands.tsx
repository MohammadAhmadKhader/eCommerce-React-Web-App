import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../customHooks/useAxios'
import ImageSkeleton from '../shared/LoadingSkeletons/ImageSkeleton'
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider'

function Brands() {
    const { brands, isBrandsLoading } = useContext(GlobalCachingContext)
    
    return (
        <section className='px-4 mt-5 mb-20 w-full'>
            <h2 className='text-xl font-semibold md:text-2xl lg:text-3xl md:font-bold mb-5'>Shop By Brands</h2>
            <div className='grid grid-cols-12 gap-6 sm:gap-12 w-full'>
                {isBrandsLoading ?
                    <>
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                        <ImageSkeleton customClass={`rounded-2xl col-span-6 lg:col-span-4 xl:col-span-2 p-3  min-h-[150px] lg:min-h-[250px] xl:min-h-[150px]`} />
                    </> : brands?.map((brand) => {
                        return (
                            <Link to={`/products?page=1&limit=9&brands=${brand.name}`} className='rounded-2xl bg-gray-200 bg-opacity-80 flex items-center justify-center
                       col-span-6 lg:col-span-4 xl:col-span-2 p-3 aspect-square'
                                key={brand.id}>

                                <img className='w-full' src={brand.imageUrl} alt={brand.name} />
                            </Link>
                        )
                    })}
            </div>
        </section>
    )
}

export default Brands