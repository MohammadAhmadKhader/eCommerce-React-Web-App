import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ReviewComponent from './ReviewComponent';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import antiMuiClasses from "./forcedStylesForMui.module.css"
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./singleProductTabs.css"
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import RelatedProductsCarousel from './RelatedProductsCarousel';
import { ISingleProductTabs, addReview } from '../../../types/types';
import LongTextSkeleton from '../../shared/LoadingSkeletons/LongTextSkeleton';
import useAxios from '../../customHooks/useAxios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';

const schema = yup.object({
    comment: yup.string().min(4).max(256).required(),
    rating: yup.number().oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).required()
})


const products = [
    {
        name: "product 1",
        finalPrice: 39.22,
        price: 80.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
    {
        name: "product 1 Awesome amazing bag! With all what u wish",
        finalPrice: 39.22,
        price: 56.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "40%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "10%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
    {
        name: "product 1",
        finalPrice: 39.22,
        price: 56.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "40%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "10%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
    {
        name: "product 1",
        finalPrice: 39.22,
        price: 56.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "40%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "10%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
]


export default function SingleProductTabs({ product, isLoading }: ISingleProductTabs) {
    const { POST, GET } = useAxios()
    const { theme } = useContext(ThemeContext);
    const [value_, setValue_] = useState<number | null>(0);
    const params = useParams()

    const [page, setPage] = useState(1)
    const [reviews, setReviews] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const maxLimit = 30;
    const minLimit = 9

    const {
        handleSubmit,
        formState: { isValid, errors },
        register,
        setValue,
        trigger,
    } = useForm<addReview>({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        searchParams.set("page", "1");
        searchParams.set("limit", "9");
        setSearchParams(searchParams)


    }, [])

    useEffect(() => {
        if (searchParams.get("limit") > maxLimit.toString()) {
            searchParams.set("limit", maxLimit.toString())
            setSearchParams(searchParams)
        }
        if (searchParams.get("limit") < minLimit.toString()) {
            searchParams.set("limit", minLimit.toString())
            setSearchParams(searchParams)
        }


    }, [searchParams])



    const onSubmit: SubmitHandler<addReview> = async (submittedData) => {
        try{
            const { data } = await POST("/reviews", {
                productId: params.productId,
                userId: import.meta.env.VITE_ADMIN_ID,
                rating: submittedData.rating,
                comment: submittedData.comment
            }, import.meta.env.VITE_ADMIN_TOKEN as string);

            if(data["message"] == "success") {
                toast.success("Review was added successfully!")
            }
        }catch(error){
            console.error(error);
            toast.error("Something Went Wrong Please Try Again Later!")
        }
        
    }

    return (
        <Tabs aria-label="Basic tabs"
            className={`${antiMuiClasses.text__inherit__forced} bg-red-500 rounded-lg`}
            defaultValue={0} style={{
                backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"

            }}
        >
            <TabList className={`${antiMuiClasses.text__inherit__forced}`}>
                <Tab className={`${antiMuiClasses.text__inherit__forced} ${antiMuiClasses.list__tabs__style}`} disableIndicator>Products Description</Tab>
                <Tab className={`${antiMuiClasses.text__inherit__forced} ${antiMuiClasses.list__tabs__style}`} disableIndicator>Related Products</Tab>
                <Tab className={`${antiMuiClasses.text__inherit__forced} ${antiMuiClasses.list__tabs__style}`} disableIndicator>Ratings and Reviews</Tab>
            </TabList>
            <TabPanel className={`${antiMuiClasses.text__inherit__forced}`}>
                {isLoading ? <LongTextSkeleton /> : product.description}
            </TabPanel>
            <TabPanel value={1} className={`${antiMuiClasses.text__inherit__forced}`}>
                <h3 className='ps-2 text-2xl text-left font-semibold'>You may also like :</h3>
                <RelatedProductsCarousel categoryId={isLoading ? "" : product.categoryId} />
            </TabPanel>
            <TabPanel value={2} className={`${antiMuiClasses.text__inherit__forced}`}>
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-y-4 my-4'>
                        <h3 className='text-2xl font-semibold'>Add Review</h3>
                        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex'>
                                <h3 className='me-3'>Product Rating : </h3>
                                <div>
                                    <Rating
                                        name="rating"
                                        precision={1}
                                        value={value_}
                                        onChange={(event, newValue) => {
                                            setValue_(newValue);
                                            setValue("rating", newValue as number)
                                        }}
                                        onTouchMove={() => {
                                            trigger("rating")
                                        }}
                                    />
                                </div>
                                {errors["rating"] && <div>
                                    <span className='text-red-700 text-xs ps-2'>{errors["rating"].message}</span>
                                </div>
                                }
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="reviewText">Review Description</label>
                                <textarea {...register("comment")} name="comment" id="reviewText" rows={10} className='mt-2 resize-none w-full rounded-lg p-2 bg-transparent border'
                                    placeholder='Enter Description' style={{
                                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                                    }} onBlur={() => {
                                        trigger("comment")
                                    }} />
                                {errors["comment"] && <span className='text-red-700 text-xs ps-2 mt-2 '>{errors["comment"].message}</span>}
                            </div>
                            <div className='text-end'>
                                <button type='submit' className='disabled:opacity-60 disabled:hover:text-white disabled:hover:bg-color-accent text-white px-8 py-1 bg-color-accent rounded-lg w-full sm:w-fit duration-300 
                                border border-color-accent hover:bg-transparent hover:text-color-accent'>
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='border-t mt-18' style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}>
                        <h3 className='text-2xl my-3'>Reviews : </h3>
                        <div className='flex flex-col gap-y-5'>
                            {product?.reviews?.map((rev) => {
                                return (
                                    <ReviewComponent review={rev} />
                                )
                            })}

                        </div>


                        <div className='flex justify-center'>
                            <Stack spacing={2} sx={{
                                maxWidth: "fit-content",
                                marginBlock: "10px",
                            }}
                                className='bg-color-accent rounded-md'
                            >
                                <Pagination sx={{
                                    color: "white !important;"
                                }}
                                    count={10} onChange={(event, value) => {
                                        searchParams.set("page", value.toString());
                                        setSearchParams(searchParams);
                                    }}
                                />
                            </Stack>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    );
}