
import React, { useContext, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io";
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';


function CartItem() {
    const [quantity, setQuantity] = useState(1);
    const [isQuantityInputFocused, setIsQuantityInputFocused] = useState(false)
    const { theme } = useContext(ThemeContext)

    return (
        <div className='flex justify-between w-fit h-fit gap-x-2 border border-solid border-black rounded-lg'>
            <div className='rounded-md '>
                <img className='rounded-lg max-h-600 border' height={'80px'} width={'75px'}
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1708290481~exp=1708291081~hmac=2b691806f30732ec151458d70d803fcdbb888db344b5bd9b2b30d749438857f5"
                    alt="" />
            </div>
            <div className='w-60 flex flex-wrap py-1'>
                <div className='flex items-start justify-between w-full'>
                    <div className='overflow-hidden'>
                        <h4 title="product name" className='line-clamp-1'>Product name</h4>
                    </div>
                    <IoMdClose className='m-1 hover:cursor-pointer ' />
                </div>

                <div className='flex justify-between w-full'>

                    <div className={`flex items-center w-fit ${isQuantityInputFocused ? "outline outline-1" : "outline-none"}`}>
                        <button onClick={() => {
                            if (quantity >= 2) {
                                setQuantity(prev => prev - 1)
                            }
                        }}>
                            <FiMinus size={18} />
                        </button>

                        <input type="number" value={quantity} placeholder='quantity'
                            className='w-8 rounded-md text-center bg-transparent outline-none'
                            style={{
                                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                            }}
                            onFocus={() => setIsQuantityInputFocused(true)}
                            onBlur={() => setIsQuantityInputFocused(false)}
                        />
                        <button onClick={() => {
                            setQuantity(prev => prev + 1)
                        }}>
                            <FiPlus size={18} />
                        </button>
                    </div>

                    <span className='me-2'>
                        $20.56
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartItem