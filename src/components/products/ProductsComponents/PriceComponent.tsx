import { IPriceComponent } from "../../../types/types"

function PriceComponent({ finalPrice, price, offer, customClassesNotOffer, customClassesOffer, customClassesOfferFinalPrice }: IPriceComponent) {

    return (
        <div>
            {
                finalPrice == price ?
                    <p className={`text-lg ${customClassesNotOffer}`}>
                        <span>${finalPrice}</span>
                    </p>
                    :
                    <p className={`flex gap-x-1 ${customClassesOffer}`}>
                        <span className={`${customClassesOfferFinalPrice ? "" : "text-lg"} ${customClassesOfferFinalPrice}`}>${finalPrice}</span>
                        <span className='line-through text-gray-600'>${price}</span>
                        <span className='text-red-600'>{"%" + Number(Number(offer.toFixed(2)) * 100).toFixed(2)} OFF</span>
                    </p>
            }
        </div>
    )
}

export default PriceComponent