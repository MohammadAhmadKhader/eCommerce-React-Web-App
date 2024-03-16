import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import Slider from "react-slick";
import { IProduct } from "../../../types/types";
import "./SingleProductCarousel.css"
//import ReactImageZoom from "react-image-zoom"
// import {
//     Magnifier,
//     GlassMagnifier,
//     SideBySideMagnifier,
//     PictureInPictureMagnifier,
//     MOUSE_ACTIVATION,
//     TOUCH_ACTIVATION,
//     MagnifierContainer
// } from "react-image-magnifiers";

function SingleProductCarousel({ product }: { product: IProduct }) {

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);
    return (
        <div className="slider-container">
            <Slider asNavFor={nav2} ref={slider => (sliderRef1 = slider as any)}
                className="single-product-image w-full"
                nextArrow={<GoChevronRight size={70} />}
                prevArrow={<GoChevronLeft size={70} />}


            >
                {product?.images?.map((image, index) => {
                    return (
                        <div className="max-w-[400px] max-h-[600px] outline-none relative" key={image._id + "image"}>
                            <img src={image.imageUrl} alt={`${product.name} image number ${index + 1}`} className="rounded-lg m-auto max-h-[500px]" />

                        </div>
                    )
                })}


            </Slider>
            <Slider
                asNavFor={nav1}
                ref={slider => (sliderRef2 = slider as any)}
                swipeToSlide={true}
                focusOnSelect={true}
                slidesToShow={6}
                className="thumbnail-slides"
                arrows={false}
                responsive={[
                    {
                        breakpoint: 1500,
                        settings: {
                            slidesToShow: 5,
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 3,

                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2.5,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4.5,
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 3.5,
                        }
                    },
                    {
                        breakpoint: 520,
                        settings: {
                            slidesToShow: 2.8,
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 2.5,
                        }
                    }
                ]}

            >

                {product?.images?.map((image, index) => {
                    return (
                        <div className="m-auto " key={image._id + "thumb"}>
                            <img src={image.thumbnailUrl} alt={`${product.name} thumbnail number ${index + 1}`}
                                className="blur-sm duration-300 hover:cursor-pointer rounded-lg bg-white object-contain h-[100px] w-full m-auto"
                                onLoad={(e) => {
                                    const img = e.currentTarget;
                                    img.classList.remove("blur-sm")
                                }}
                            />
                        </div>
                    )
                })}

            </Slider>

        </div>
    );
}

export default SingleProductCarousel

