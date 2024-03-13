const tempImg = "https://s3-alpha-sig.figma.com/img/dda1/f126/e21479d8602051b0469c5c40d6e2db6e?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qnJOGcEaW~damN-tfcMArCJFXpV6kZFgVGCtkmTkZ4s1sqvJr7RWRBWK8fWsvicvF~02rXAWjD7srXG-o-PiSz3J04~LNP-0K6oi0a2tts0jMQcHqMlsKIReFVI1swLoXCPS4W0gMmRM5whmdl0MTM-cbHw6a1TY-vem8GFnhUeiIotx5RWjPbyJPGT8G6qTUc39OAATmYgsXxIAiTEirPnhStR6zp2IawT5Z3ThfoxKtk3wqZIta8JZqz0zcpBOkbIjlKXLMfrRp1XlWBfnKK6PI2eI4rdatBl7cpKjLvRyxe1oLyt~BkQWOi9TSNORTQsZjF1FCXdwW3e00znZ6Q__"
const tempName = "Product Name"

interface ISingleOrder {
    imgUrl: string;
    name: string;
    price: number;
    quantity: number;
}

function SingleOrder({ imgUrl, name, price, quantity}: ISingleOrder) {
    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-4'>
                <div className='flex gap-x-2'>
                    <div className='flex-shrink-0'>
                        <img className='rounded-md'
                            width={'75px'} height={'80px'} src={imgUrl || tempImg} alt={name || tempName} />
                    </div>

                    <div className='font-semibold'>
                        <h5>{name || tempName}</h5>
                    </div>
                </div>
            </div>


            <div className='col-span-2 text-sm font-semibold'>
                ${price || 56.43}
            </div>


            <div className='col-span-2 text-sm font-semibold'>
                {quantity || 1}
            </div>

            <div className='col-span-2 text-sm font-semibold'>
                ${quantity *  price || 231.43}
            </div>
        </div>
    )
}

export default SingleOrder