import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { FaEdit, FaTrash } from "react-icons/fa";
import { Review } from '../../../types/types';
import { UserContext } from '../../features/UserFeature/UserProvider';
import Rating from '@mui/material/Rating';
import useAxios from '../../customHooks/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
const defaultUserImage = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/UsersImages/rtnfqs2mx3rvvgleayna"
const sevenDaysInMs = 604800000;

function ReviewComponent({ review, mode }: { review: Review, mode: "self" | "public" }) {
    const { theme } = useContext(ThemeContext);
    const { userData, userToken } = useContext(UserContext);
    const { DELETE } = useAxios();
    const params = useParams();
    const {debounce} = useDebounce()

    const deleteReview = async (productId: string, reviewId: string) => {
        try {
            const response = await DELETE("/reviews", {
                productId,
                reviewId
            }, userToken)

            if (response.status == 204){
                toast.success("Review was deleted successfully!")
            }
        } catch (error) {
            toast.error("Something Went Wrong Please Try Again Later!")
            console.log(error)
        }
    }
    return (
        <div className='flex gap-x-4 border border-solid rounded-md p-2 w-full'
            style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
        >

            <div className='flex-shrink-0'>
                <img className='rounded-full hover:cursor-pointer border border-solid object-cover w-[50px] h-[50px] '
                    src={mode == "self" ? userData.userImg ? userData.userImg : defaultUserImage : review.user.userImg || defaultUserImage}
                    alt={mode == "self" ? userData.firstName + userData.lastName + "image" : review.user.firstName + review.user.lastName + "image"}
                    style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}
                />
            </div>

            <div className='w-full'>
                <div className='flex flex-col sm:flex-row gap-x-3 font-semibold mb-1.5'>
                    <h4 className='inline-block text-lg hover:cursor-pointer'>{mode == "self" ? userData.firstName + userData.lastName : review.user.firstName + review.user.lastName}</h4>
                    <p className='flex items-center sm:px-2 rounded-lg text-sm sm:ms-auto sm:bg-amber-400'>{new Date(review.createdAt).toLocaleString()}</p>
                </div>

                <div className='ps-2 relative overflow-hidden'>
                    {review.comment}
                    <div className='absolute left-0 bg-sky-500 w-0.5 top-1.5 h-full rounded-full'>

                    </div>
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <div>
                        <Rating
                            sx={{
                                fontSize: "1.25rem !important",
                                '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
                                    color: 'var(--stars--color)',
                                },
                                color: 'var(--stars--color)'
                            }}

                            style={{ fontSize: 20 }}
                            name="read-only" value={review.rating} precision={0.1} readOnly />
                    </div>

                    {mode == "public" && userData._id === review.user._id &&
                        <div className='flex gap-x-4 text-sm'>

                            <button title="Edit" className={`opacity-65 hover:opacity-100 duration-300 hover:cursor-pointe disabled:hover:cursor-default disabled:hover:opacity-65`}
                                disabled={new Date().getTime() > new Date(review.createdAt).getTime() + sevenDaysInMs ? true : false} onClick={() => {
                                    if(!(new Date().getTime() > new Date(review.createdAt).getTime() + sevenDaysInMs)){
                                        debounce(()=>{
                                             console.log("Edit button")
                                         },300) 
                                     }
                                }}>
                                <FaEdit />
                            </button>
                            <button title="Delete" className={`opacity-65 hover:opacity-100 duration-300 hover:cursor-pointe disabled:hover:cursor-default disabled:hover:opacity-65`}
                                disabled={new Date().getTime() > new Date(review.createdAt).getTime() + sevenDaysInMs ? true : false} onClick={() => {
                                    if(!(new Date().getTime() > new Date(review.createdAt).getTime() + sevenDaysInMs)){
                                       debounce(()=>{
                                            deleteReview(params.productId,review._id)
                                        },300) 
                                    }
                                    
                                }}>
                                <FaTrash />
                            </button>
                        </div>}
                </div>

            </div>




        </div>
    )
}

export default ReviewComponent