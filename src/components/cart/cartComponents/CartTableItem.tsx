import { FaTrash } from "react-icons/fa";
import { PiHandbagSimple } from 'react-icons/pi';
import { ICartTableItem } from "../../../types/types";

function CartTableItem({ imgUrl, name, price, quantity }: ICartTableItem) {
    return (
        <tr>
            <td className='p-2' width={"45%"}>
                <div className='flex gap-x-3'>
                    <div className='flex-shrink-0'>
                        <img className='rounded-lg max-h-600 border blur-sm' height={'80px'} width={'75px'}
                            src={imgUrl}
                            alt={name} onLoad={(e)=>{
                                const Img = e.currentTarget;
                                Img.classList.remove("blur-sm")
                            }} />
                    </div>
                    <div className='flex flex-col justify-center gap-y-2'>
                        <h4 title={'Product name'} className='line-clam-1 text-xl font-semibold'>{name}</h4>
                        <span className='text-white opacity-80'>Qty - 1</span>
                    </div>
                </div>
            </td>
            <td className='py-2' width={"15%"}>
                ${price}
            </td>
            <td className='py-2' width={"10%"}>
                {quantity}
            </td>
            <td className='py-2' width={"15%"}>
                ${price * quantity}
            </td>
            <td width={"15%"}>
                <div className='flex flex-col w-fit gap-y-2 ms-auto'>
                    <button className='px-2 py-1 flex items-center gap-x-1 duration-300 rounded-md text-white
             bg-color-accent hover:bg-transparent hover:text-color-accent border-color-accent border justify-start' style={{
                            minWidth: "150px"
                        }}>
                        <span>
                            <PiHandbagSimple />
                        </span>
                        <span className='flex-shrink-0'>
                            Add To Wishlist
                        </span>
                    </button>
                    <button className='px-2 py-1 flex items-center gap-x-1 duration-300 rounded-md text-white
             bg-rose-600 hover:text-rose-600 hover:bg-transparent border border-rose-600 justify-start' style={{
                            minWidth: "150px"
                        }}>
                        <span>
                            <FaTrash />
                        </span>
                        <span className='flex-shrink-0'>
                            Remove
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartTableItem