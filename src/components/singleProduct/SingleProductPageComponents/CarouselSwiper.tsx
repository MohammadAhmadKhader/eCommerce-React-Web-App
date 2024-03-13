import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./CarouselSwiper.css"
import ProductWithRatingsCard from '../../products/ProductsComponents/ProductWithRatingsCard';

interface SwiperCarousel {
  Iterable: Array<any>;
}

function SwiperCarousel({ Iterable }: SwiperCarousel) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        1284: {
          spaceBetween: 20,
          slidesPerView: 4
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        520: {
          spaceBetween: 20,
          slidesPerView: 2
        },
        0: {
          spaceBetween: 20,
          slidesPerView: 1
        }
      }}
    >
      {/* imageUrl={prod?.images[0]?.imageUrl} */}
      {
        Iterable.map((prod) => {
          return (
            <SwiperSlide key={prod.id} className='pb-10'>
              <ProductWithRatingsCard _id={prod._id} ratingNumbers={prod.ratingNumbers} name={prod.name}  price={prod.price} imageUrl={prod?.images?.length > 0 ? prod.images[0].imageUrl : ""}
                avgRating={prod.avgRating} finalPrice={prod.finalPrice} brand={prod.brand} quantity={prod.quantity} offer={prod.offer} />
            </SwiperSlide>
          )
        })
      }


    </Swiper>
  );
}

export default SwiperCarousel