import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import MyWishListItem from './MyWishListItem';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../features/UserFeature/UserProvider';
import CircularLoader from '../../shared/CircularLoader';
const emptyWishList = "https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/ebck3buaoerk2dhnjfcg"

function MyWishList() {
    const { theme } = useContext(ThemeContext)
    const { GET, isLoading: isWishListLoading, setIsLoading: setIsWishListLoading } = useAxios();
    const { userData, userToken, isUserFetchDataLoading } = useContext(UserContext)
    const [wishList, setWishList] = useState([])
    const getUserWishList = async () => {
        try {
            const { data } = await GET(`/wishlists/${userData._id}`, userToken);
            
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
                {isWishListLoading || isUserFetchDataLoading ?
                    <div className='col-span-12'>
                        <CircularLoader minHeight={500} />
                    </div> : wishList.length > 0 ?

                        wishList?.map((item) => {
                            return (
                                <MyWishListItem name={item.product.name} key={item._id + "key"} imgUrl={item.product.images[0].imageUrl}
                                    productId={item.product._id} wishListId={item._id} />
                            )
                        }) :
                        <div className='col-span-12'>
                            <div className='flex justify-center items-center min-h-[500px] text-center flex-col'>
                                <div>
                                    <img src={emptyWishList} alt="empty wish List" />
                                </div>
                                <div className='mt-2'>
                                    <h4 className='text-2xl font-semibold'>Well...</h4>
                                    <h4>It seems you have not added any products to for wishlist. </h4>
                                </div>
                            </div>
                        </div>}
            </div>
        </div>
    )
}

export default MyWishList