interface ISingleOrder {
    imgUrl: string;
    name: string;
    price: number;
    quantity: number;
}

function SingleOrder({ imgUrl, name, price, quantity }: ISingleOrder) {
    console.log(price, quantity)
    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-4'>
                <div className='flex gap-x-2'>
                    <div className='flex-shrink-0'>
                        <img className='rounded-md'
                            width={'75px'} height={'80px'} src={imgUrl} alt={name} />
                    </div>

                    <div className='font-semibold'>
                        <h5>{name}</h5>
                    </div>
                </div>
            </div>


            <div className='col-span-2 text-sm font-semibold'>
                ${Number(price).toFixed(2)}
            </div>


            <div className='col-span-2 text-sm font-semibold'>
                {quantity}
            </div>

            <div className='col-span-2 text-sm font-semibold'>
                ${Number(quantity * price).toFixed(2)}
            </div>
        </div>
    )
}

export default SingleOrder