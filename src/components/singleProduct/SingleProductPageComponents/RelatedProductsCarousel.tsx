import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import Slider from "react-slick";
import { useContext, useEffect } from "react";
import ProductWithRatingsCard from "../../products/ProductsComponents/ProductWithRatingsCard";
import SingleSkeleton from "../../shared/LoadingSkeletons/SingleSkeleton";
import { useParams } from "react-router-dom";
import { GlobalCachingContext } from "../../features/GlobalCachingContext/GlobalCachingProvider";

interface IRelatedProductsCarousel {
    categoryId: string;
}
function RelatedProductsCarousel({ categoryId }: IRelatedProductsCarousel) {
    const params = useParams()
    // This is just to create a correct loading cards in carousel
    const loadingArr = ['', '', '', '', '']

    const { product, relatedProducts, setIsRelatedProductLoading, isRelatedProductLoading, getRelatedProducts }
        = useContext(GlobalCachingContext);

    useEffect(() => {
        setIsRelatedProductLoading(true)
        getRelatedProducts(categoryId, params.productId)
    }, [product, params.productId])
    return (
        <div className="slider-container">
            <Slider
                slidesToShow={4}
                slidesToScroll={1}
                speed={500}
                infinite={true}
                nextArrow={<GoChevronRight size={50} />}
                prevArrow={<GoChevronLeft size={50} />}
                responsive={[
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2.3,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1.5,
                        }
                    }
                ]}
            >

                {isRelatedProductLoading ?
                    loadingArr.map(() => {
                        return (
                            <div className="px-2 my-5">
                                <SingleSkeleton />
                            </div>
                        )
                    })
                    :
                    relatedProducts?.map((prod) => {
                        return (
                            <div className="p-1.5 xl:p-2.5 text-left">
                                <ProductWithRatingsCard name={prod.name} finalPrice={prod.finalPrice} price={prod.price} _id={prod._id}
                                    brand={prod.brand} avgRating={prod.avgRating} offer={prod.offer} key={prod._id} imageUrl={prod.images[0].imageUrl} ratingNumbers={prod.ratingNumbers} quantity={prod.quantity} />

                            </div>
                        )
                    })}


            </Slider>
        </div>
    )
}

export default RelatedProductsCarousel