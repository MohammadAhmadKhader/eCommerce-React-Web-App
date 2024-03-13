import React, { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { FaEdit, FaTrash, FaReply } from "react-icons/fa";
import StarsComponent from '../../shared/StarsComponent';
import { Review } from '../../../types/types';


function ReviewComponent({review } : {review : Review} ) {
    const { theme } = useContext(ThemeContext)
    return (
        <div className='flex gap-x-4 border border-solid rounded-md p-2'
            style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
        >

            <div className='w-12 h-12 flex-shrink-0'>
                <img className='w-full rounded-full hover:cursor-pointer border border-solid'
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1708290481~exp=1708291081~hmac=2b691806f30732ec151458d70d803fcdbb888db344b5bd9b2b30d749438857f5"
                    alt="user img"
                    style={{
                        borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                    }}
                />
            </div>

            <div>
                <div className='flex gap-x-3 font-semibold mb-1.5'>
                    <h4 className='inline-block text-lg hover:cursor-pointer'>Mohammad Khader</h4>
                    <p className='flex items-center px-2 rounded-lg text-sm ms-auto bg-amber-400'>19 Jan 2024</p>
                </div>

                <div className='ps-2 relative overflow-hidden'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus accusamus deleniti,
                    architecto repellat harum aliquam nemo sapiente. Assumenda, facere officiis?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum culpa quia commodi similique a
                    ccusantium illo deleniti saepe sed ratione sit.
                    <div className='absolute left-0 bg-sky-500 w-0.5 top-1.5 h-full rounded-full'>

                    </div>
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <div>
                        <StarsComponent size={18} />
                    </div>

                    <div className='flex gap-x-4 text-sm'>
                        <button title="Reply" className='opacity-65 hover:opacity-100 duration-300'>
                            <FaReply />
                        </button>
                        <button title="Edit" className='opacity-65 hover:opacity-100 duration-300'>
                            <FaEdit />
                        </button>
                        <button title="Delete" className='opacity-65 hover:opacity-100 duration-300'>
                            <FaTrash />
                        </button>
                    </div>
                </div>

            </div>




        </div>
    )
}

export default ReviewComponent