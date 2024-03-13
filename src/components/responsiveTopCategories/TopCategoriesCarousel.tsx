import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

interface SwiperCarousel {
    Iterable: Array<any>;
}

function SwiperCarousel({ Iterable }: SwiperCarousel) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={5}

            pagination={{ clickable: true }}
            breakpoints={{
                0: {
                    slidesPerView: 3
                },
                480: {
                    slidesPerView: 4
                },
                550: {
                    slidesPerView: 4.5
                }

            }}>


            {Iterable?.map((category) => {
                return (
                    <SwiperSlide key={category.id}>
                        <Link to={`/${category.name}`} className='flex flex-col items-center aspect-square text-center'>
                            <div className='bg-gray-100 rounded-md flex items-center justify-center p-3 size-20'>
                                <img src={category.image_secure_url} alt={category.name}
                                    className='flex-shrink-0 object-cover' />
                            </div>
                            <p className='text-center'>
                                {category.name}
                            </p>
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
}

export default SwiperCarousel