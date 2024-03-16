import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../features/CartFeature/CartProvider';

function OrderCalcs() {
  let {cartItems } :any= useContext(CartContext)
  // * Will be fixed soon
  
  cartItems = cartItems.cart
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0)
  useEffect(() => {
    let calculatedSubTotal = 0;
    let quantity = 1;
    cartItems?.forEach((item) => {
      calculatedSubTotal += item.productId.finalPrice;
      quantity = item.quantity
    })
    console.log(cartItems)
    if (cartItems) {
      setDiscount(Number((cartItems?.length * discount).toFixed(2)));
      setSubTotal(Number((calculatedSubTotal * quantity).toFixed(2)))
    }

  }, [cartItems])
  useEffect(() => {
    setGrandTotal(subTotal - discount - deliveryFee)

  }, [discount, subTotal, deliveryFee])

  return (
    <ul className='flex flex-col gap-y-3 my-4'>
      <li className='flex items-center justify-between'>
        <h4>SubTotal</h4>
        <span className='font-bold'>${subTotal}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4>Discount</h4>
        <span className='font-bold'>${discount}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4>DeliveryFee</h4>
        <span className='font-bold'>${deliveryFee}</span>
      </li>

      <li className='flex items-center justify-between'>
        <h4 className='font-bold'>GrandTotal</h4>
        <span className='font-bold'>${grandTotal}</span>
      </li>
    </ul>
  )
}

export default OrderCalcs