import { useContext } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { IOrderSummaryItem } from '../../../types/types'


function OrderSummaryItem({ customClasses, image, name, quantity, brand }: IOrderSummaryItem) {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`flex justify-between gap-x-2 w-fit h-fit rounded-lg ${customClasses}`}
            style={{
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}
        >
            <div className='rounded-md '>
                <img className='rounded-lg max-h-600 border w-[75px] h-[80px] object-cover'
                    src={image}
                    alt={`${name} product image`} />
            </div>
            <div className='w-60 py-1 flex flex-col'>
                <div className='overflow-hidden'>
                    <h4 title="product name" className='line-clamp-1'>{name}</h4>
                    <h4 title="product name" className='line-clamp-1'>{brand}</h4>
                </div>
                <div>
                    <p className={`text-opacity-70 mt-2 ${theme == "dark" ? "text-gray-100" : "text-gray-600"}`}>
                        Qty -
                        <span className='ms-1'>
                            {quantity}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryItem