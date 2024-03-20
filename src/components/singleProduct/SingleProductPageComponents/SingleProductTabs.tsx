import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ReviewComponent from './ReviewComponent';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
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
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../features/UserFeature/UserProvider';
import Tooltip from '@mui/material/Tooltip';


const schema = yup.object({
    comment: yup.string().min(4).max(256).required(),
    rating: yup.number().oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).required()
})

export default function SingleProductTabs({ product, isProductByIdLoading, reviewsCount, reviewsLimit }: ISingleProductTabs) {
    const { POST } = useAxios()
    const { theme } = useContext(ThemeContext);
    const { userData, userToken } = useContext(UserContext)
    const [value_, setValue_] = useState<number | null>(0);
    const params = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        handleSubmit,
        formState: { isValid, errors,isSubmitting },
        register,
        setValue,
        trigger,
    } = useForm<addReview>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<addReview> = async (submittedData) => {
        try {
            if (!userData) {
                toast.error("You must sign in!")
                return;
            }
            const { data } = await POST("/reviews", {
                productId: params.productId,
                userId: import.meta.env.VITE_ADMIN_ID,
                rating: submittedData.rating,
                comment: submittedData.comment
            }, userToken);

            if (data["message"] == "success") {
                toast.success("Review was added successfully!")
            }
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong Please Try Again Later!")
        }
    }

    return (
        <Tabs aria-label="Basic tabs"
            className={` bg-red-500 rounded-lg`}
            defaultValue={0} style={{
                backgroundColor: theme == "dark" ? "var(--dark--bgCard-color)" : "var(--light--bgCard-color)",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
            sx={{
                color: "inherit !important"
            }}
        >
            <TabList sx={{
                color: "inherit !important"
            }}>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },

                }}

                    disableIndicator>Products Description</Tab>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },


                }}

                    disableIndicator>Related Products</Tab>
                <Tab sx={{
                    color: "inherit !important",
                    transition: "400ms !important",
                    margin: "4px",
                    borderRadius: "10px",
                    '&:hover, &[aria-selected="true"]': {
                        backgroundColor: 'var(--accent-color) !important',
                        color: "white !important"
                    },
                }}

                    disableIndicator>Ratings and Reviews</Tab>
            </TabList>
            <TabPanel sx={{ color: "inherit !important" }}>
                {isProductByIdLoading ? <LongTextSkeleton /> : product.description}
            </TabPanel>
            <TabPanel value={1} sx={{ color: "inherit !important" }}>
                <h3 className='ps-2 text-2xl text-left font-semibold'>You may also like :</h3>
                <RelatedProductsCarousel categoryId={isProductByIdLoading ? "" : product.categoryId} />
            </TabPanel>
            <TabPanel value={2} sx={{ color: "inherit !important" }}>
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
                                <label htmlFor="reviewText">Review comment</label>
                                <textarea {...register("comment")} name="comment" id="reviewText" rows={10} className='mt-2 resize-none w-full rounded-lg p-2 bg-transparent border'
                                    placeholder='Enter Your Comment' style={{
                                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                                    }} onBlur={() => {
                                        trigger("comment")
                                    }} />
                                {errors["comment"] && <span className='text-red-700 text-xs ps-2 mt-2 '>{errors["comment"].message}</span>}
                            </div>
                            <div className='text-end'>
                                <Tooltip title={userData ? undefined : "You must sign in"}>
                                    <span>
                                        <button type='submit' className='disabled:opacity-60 disabled:hover:text-white disabled:hover:bg-color-accent text-white px-8 py-1 bg-color-accent rounded-lg w-full sm:w-fit duration-300 
                                border border-color-accent hover:bg-transparent hover:text-color-accent text-sm' disabled={userData || !isSubmitting ? false : true}>
                                            Submit Review
                                        </button></span>
                                </Tooltip>
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
                                    <ReviewComponent mode="public" review={rev} key={rev._id} />
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
                                    count={Math.ceil(reviewsCount / reviewsLimit)} onChange={(event, value) => {
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