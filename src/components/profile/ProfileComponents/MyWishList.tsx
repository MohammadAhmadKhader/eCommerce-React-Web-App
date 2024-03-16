import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import MyWishListItem from './MyWishListItem';
import useAxios from '../../customHooks/useAxios';
import { UserContext } from '../../features/UserFeature/UserProvider';

const products = [
    {
        name: "product 1",
        finalPrice: 39.22,
        price: 80.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
    {
        name: "product 1 Awesome amazing bag! With all what u wish",
        finalPrice: 39.22,
        price: 56.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "40%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "10%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }, {
        name: "product 1",
        finalPrice: 39.22,
        price: 39.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    },
    {
        name: "product 1",
        finalPrice: 39.22,
        price: 56.22,
        offer: "50%",
        avgRating: 4.2,
        imgUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ratingsNumbers: 25
    }
]

function MyWishList() {
    const { theme } = useContext(ThemeContext)
    const { GET, isLoading: isWishListLoading, setIsLoading: setIsWishListLoading } = useAxios();
    const { userData, userToken } = useContext(UserContext)
    const [wishList, setWishList] = useState([])
    const getUserWishList = async () => {
        try {
            const { data } = await GET(`/wishlists/${userData._id}`, userToken);
            console.log(data)
            setWishList(data.wishList)
            setIsWishListLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserWishList()
    }, [userData])
    return (
        <div className='MyWishList'>
            <div className='border-b' style={{
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
            }}>
                <h3 className='text-2xl py-2'>
                    My WishList
                </h3>
            </div>
            <div className='grid grid-cols-12 gap-5 my-5'>
                {isWishListLoading ? <div>Loading ..</div>:
                
                wishList?.map((prod) => {
                    return (
                        <MyWishListItem name={prod.productId.name} key={prod._id} imgUrl={prod.productId.images[0].imageUrl}
                         productId={prod.productId._id} wishListId={prod._id}/>
                    )
                })}
            </div>
        </div>
    )
}

export default MyWishList