import Home from '../components/home/Home';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import Login from '../components/login/Login';
import SignUp from '../components/signup/SignUp';
import ChangePassword from '../components/changePassword/ChangePassword';
import SingleProductPage from '../components/singleProduct/SingleProductPage';
import Products from '../components/products/Products';
import Cart from '../components/cart/Cart';
import Profile from '../components/profile/Profile';
import Checkout from '../components/checkout/Checkout';
import ProfileInformation from '../components/profile/ProfileComponents/ProfileInformation';
import ReDirectorProfiles from '../components/protectedRoutes/ReDirectorProfile';
import MyReviews from '../components/profile/ProfileComponents/MyReviews';
import MyWishList from '../components/profile/ProfileComponents/MyWishList';
import MyOrders from '../components/profile/ProfileComponents/MyOrders';
import SingleOrderSection from '../components/profile/ProfileComponents/SingleOrder/SingleOrderSection';
import ChangePasswordFromProfile from '../components/profile/ProfileComponents/ChangePasswordFromProfile';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactUs from '../components/ContactUs/ContactUs';
import PrivateRoute from '../components/protectedRoutes/PrivateRoute';
import Auth from '../components/protectedRoutes/Auth';
import ResetPassword from '../components/resetPassword/ResetPassword';
import ForgotPassword from '../components/forgotPassword/ForgotPassword';
import ResetPasswordProtectingRoute from '../components/protectedRoutes/ResetPasswordProtectingRoute';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "/login",
                element:
                    <Auth>
                        <Login />
                    </Auth>
            },
            {
                path: "/signup",
                element:
                    <Auth>
                        <SignUp />
                    </Auth>

            },
            {
                path: "/resetPassword/:token",
                element:
                    <ResetPasswordProtectingRoute>
                        <ResetPassword />
                    </ResetPasswordProtectingRoute>
            },
            {
                path: "/forgotPassword",
                element: <ForgotPassword />
            },
            {
                path: "/changepassword",
                element:
                    <PrivateRoute>
                        <ChangePassword />
                    </PrivateRoute>
            },
            {
                path: "/products/:productId",
                element: <SingleProductPage />

            },
            {
                path: "/products",
                element: <Products />
            }
            ,
            {
                path: "/cart",
                element:
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/profile",
                element:
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ,
                children: [{
                    path: "",
                    element: <ReDirectorProfiles>
                        <ProfileInformation />
                    </ReDirectorProfiles>
                }, {
                    index: true,
                    path: "information",
                    element: <ProfileInformation />
                }, {
                    path: "changepassword",
                    element: <ChangePasswordFromProfile />
                }, {
                    path: "orders",
                    element: <MyOrders />
                }, {
                    path: "orders/:id",
                    element: <SingleOrderSection />
                }, {
                    path: "reviews",
                    element: <MyReviews />
                }, {
                    path: "wishlist",
                    element: <MyWishList />
                }]
            }, {
                path: "aboutus",
                element: <AboutUs />
            }, {
                path: "contactus",
                element: <ContactUs />
            }
        ]
    }
])
