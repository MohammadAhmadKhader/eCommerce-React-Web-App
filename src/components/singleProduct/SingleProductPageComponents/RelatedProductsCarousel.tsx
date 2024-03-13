import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import useAxios from "../../customHooks/useAxios";
import ProductWithRatingsCard from "../../products/ProductsComponents/ProductWithRatingsCard";
import SingleSkeleton from "../../shared/LoadingSkeletons/SingleSkeleton";
import { Skeleton } from "@mui/joy";
import ImageSkeleton from "../../shared/LoadingSkeletons/ImageSkeleton";
import { useParams } from "react-router-dom";

interface IRelatedProductsCarousel {
    categoryId: string;
}

const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae quia id architecto. Perspiciatis sed consectetur, ea voluptates at hic quis est ratione alias! Optio, magni necessitatibus facere aliquid vero minima"

function RelatedProductsCarousel({ categoryId }: IRelatedProductsCarousel) {
    const params = useParams()
    const [relatedProducts, setRelatedProducts] = useState([])
    const { GET, isLoading, setIsLoading } = useAxios()
    // This is just to create a correct loading cards in carousel
    const loadingArr = ['', '', '', '', '']

    const getRelatedProducts = async () => {
        const { data } = await GET(`/products?page=1&limit=9&category=${categoryId}`)
        const removedCurrentProduct = data.products.filter((prod) => prod._id !== params.productId)
        setRelatedProducts(removedCurrentProduct)
        setIsLoading(false)
        return data;
    }
    useEffect(() => {
        setIsLoading(true)
        console.log("Related Products was sent")
        //getRelatedProducts()
    }, [])
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

                {isLoading ?
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