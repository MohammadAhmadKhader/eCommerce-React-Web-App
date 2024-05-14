import React, { createContext, useContext, useEffect, useState } from 'react'
import { CartItems } from '../../../types/types';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../UserFeature/UserProvider';

export interface CartContext {
    cartItems: CartItems[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItems[] | []>>;
    isCartLoading: boolean;
    setIsCartLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getCartItems: () => Promise<void>
}

export const CartContext = createContext<CartContext>(null)

function CartProvider({ children }) {
    const { GET, isLoading: isCartLoading, setIsLoading: setIsCartLoading } = useAxios()
    const [cartItems, setCartItems] = useState<any>([])
    const { userData, userToken } = useContext(UserContext)

    const getCartItems = async () => {
        try {
            if (userData) {
                const { data } = await GET(`/carts/${userData._id}`, userToken)
                setCartItems(data.cart);
                setIsCartLoading(false)
                console.log(data.cart)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getCartItems();
    }, [userData])


    return (
        <CartContext.Provider value={{ isCartLoading, setIsCartLoading, cartItems, setCartItems, getCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider