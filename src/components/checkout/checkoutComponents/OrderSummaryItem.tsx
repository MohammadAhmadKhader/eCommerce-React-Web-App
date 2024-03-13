import React, { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { IOrderSummaryItem } from '../../../types/types'


function OrderSummaryItem({customClasses} : IOrderSummaryItem) {
    const { theme } = useContext(ThemeContext)
    return (
        <div className={`flex justify-between w-fit h-fit gap-x-2 border border-solid border-black rounded-lg ${customClasses}`}
            style={{
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
        >
            <div className='rounded-md '>
                <img className='rounded-lg max-h-600 border' height={'80px'} width={'75px'}
                    src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1708290481~exp=1708291081~hmac=2b691806f30732ec151458d70d803fcdbb888db344b5bd9b2b30d749438857f5"
                    alt="" />
            </div>
            <div className='w-60 py-1 flex flex-col'>
                <div className='overflow-hidden'>
                    <h4 title="product name" className='line-clamp-1'>Product name</h4>
                </div>
                <div>
                    <p className={`text-opacity-70 mt-2 ${theme == "dark" ? "text-gray-100" : "text-gray-600"}`}>
                        Qty-
                        <span>
                            1
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryItem