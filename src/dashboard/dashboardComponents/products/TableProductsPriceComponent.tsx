import { IProduct } from '../../../types/types'

function TableProductsPriceComponent({product}:{product:IProduct}) {
  return (
    <div className='flex flex-col gap-y-0.5 text-left'>
        {product?.offer == 0 ? <h4><span className='font-semibold'>Price :</span> {product?.price}$</h4> :
        <h4 className='line-through text-red-600'><span className='font-semibold'>Price :</span> {product?.price}$</h4>}
        <h4><span className='font-semibold'>Final Price :</span> {product?.finalPrice}$</h4>
        <h4><span className='font-semibold'>Offer% </span>: {product?.offer}%</h4>
    </div>
  )
}

export default TableProductsPriceComponent