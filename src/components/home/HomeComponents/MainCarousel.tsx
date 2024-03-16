import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function MainCarousel() {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            modules={[Autoplay]}

        >
            <SwiperSlide className='relative overflow-hidden'>
                <img className='object-cover w-full rounded-xl min-h-72'
                    style={{ aspectRatio: "16/5" }}
                    src={"https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/oj1sijz66rusou08uvwz"} />

                <div className='absolute -right-2 lg:-right-8 xl:-right-14 top-66 lg:top-56 xl:top-2/3 -translate-y-52 bg-white bg-opacity-75 text-sky-900 rounded-xl w-80% md:w-60% lg:w-45% p-4 lg:p-8'>
                    <div className='flex flex-col gap-y-4 lg:gap-y-8'>
                        <h2 className='text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>Carry Your Funk</h2>
                        <p className='text-xl sm:text-2xl lg:text-3xl'>
                            Trendy Collections Just For You!
                        </p>

                        <div>
                            <Link to="/" className='text-white bg-sky-900 rounded-lg flex items-center justify-between gap-x-4 w-fit px-4 py-2'>
                                <FaArrowRight />
                                <p> See more</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className='relative'>
                <img className='object-cover w-full rounded-xl min-h-72'
                    style={{ aspectRatio: "16/5" }}
                    src={"https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/di67hizpojdzjg4k6k0f"} />
                <div className='absolute left-0 top-0 p-10'>
                    <div className='text-red-600'>
                        <div className='text-2xl sm:text-3xl lg:text-5xl font-semibold'>
                            Spring Summer <br />Collections
                        </div>

                        <div className='bg-white bg-opacity-50 rounded-md w-fit px-2 py-1 mt-5 text-xl sm:text-2xl lg:text-3xl'>
                            OFFERS UP TO 50%
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper >
    )
}

export default MainCarousel