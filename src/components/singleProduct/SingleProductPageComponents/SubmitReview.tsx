
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import Rating from '@mui/material/Rating';
import "./singleProductTabs.css"
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { addReview } from '../../../types/types';
import useAxios from '../../customHooks/useAxios';
import { useContext, useState } from 'react';
import { UserContext } from '../../features/UserFeature/UserProvider';
import Tooltip from '@mui/material/Tooltip';
import { GlobalCachingContext } from '../../features/GlobalCachingContext/GlobalCachingProvider';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';


const schema = yup.object({
    comment: yup.string().min(4).max(256).required(),
    rating: yup.number().oneOf([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]).required()
})


function SubmitReview() {
    const { POST } = useAxios()
    const { theme } = useContext(ThemeContext);
    const { userData, userToken } = useContext(UserContext)
    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const { getProductData } = useContext(GlobalCachingContext);
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const ratingStarsTheme = createTheme({
        components: {
            MuiRating: {
                styleOverrides: {
                    iconEmpty: {
                        color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                        opacity: 0.6
                    }
                },

            },
        },
    })

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setValue,
        trigger,
        reset,
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
                rating: submittedData.rating,
                comment: submittedData.comment
            }, userToken);

            if (data["message"] == "success") {
                toast.success("Review was added successfully!");
                reset();
                setRatingValue(0);
                getProductData(parseInt(searchParams.get("page")).toString() || "1", parseInt(searchParams.get("limit")).toString() || "9", params.productId);

            }
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong Please Try Again Later!")
        }
    }
    return (
        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex'>
                <h3 className='me-3'>Product Rating : </h3>
                <div>
                    <ThemeProvider theme={ratingStarsTheme}>
                        <Rating
                            name="rating"
                            precision={1}
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                                setValue("rating", newValue as number)
                            }}
                            onTouchMove={() => {
                                trigger("rating")
                            }}
                        /></ThemeProvider>
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
    )
}

export default SubmitReview