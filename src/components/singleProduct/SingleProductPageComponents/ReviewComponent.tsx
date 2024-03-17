import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { FaEdit, FaTrash, FaReply } from "react-icons/fa";
import { Review } from '../../../types/types';
import { UserContext } from '../../features/UserFeature/UserProvider';
import Rating from '@mui/material/Rating';

function ReviewComponent({ review, mode }: { review: Review, mode: "self" | "public" }) {
    const { theme } = useContext(ThemeContext)
    const { userData } = useContext(UserContext)
    return (
        <div className='flex gap-x-4 border border-solid rounded-md p-2 w-full'
            style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
        >

            <div className='flex-shrink-0'>
                <img className='rounded-full hover:cursor-pointer border border-solid object-cover w-[50px] h-[50px] '
                    src={mode == "self" ? userData.userImg : review.user.userImg}
                    alt={mode == "self" ? userData.firstName + userData.lastName + "image" : review.user.firstName + review.user.lastName + "image"}
                    style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}
                />
            </div>

            <div className='w-full'>
                <div className='flex gap-x-3 font-semibold mb-1.5'>
                    <h4 className='inline-block text-lg hover:cursor-pointer'>{mode == "self" ? userData.firstName + userData.lastName : review.user.firstName + review.user.lastName}</h4>
                    <p className='flex items-center px-2 rounded-lg text-sm ms-auto bg-amber-400'>{review.createdAt}</p>
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

                    <div className='flex gap-x-4 text-sm'>
                        <button title="Edit" className='opacity-65 hover:opacity-100 duration-300' disabled={true} onClick={()=>{
                            
                        }}>
                            <FaEdit />
                        </button>
                        <button title="Delete" className='opacity-65 hover:opacity-100 duration-300' disabled={true} onClick={()=>{
                            
                        }}>
                            <FaTrash />
                        </button>
                    </div>
                </div>

            </div>




        </div>
    )
}

export default ReviewComponent