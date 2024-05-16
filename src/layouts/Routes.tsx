import Home from '../components/home/Home';
import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import Login from '../components/auth/login/Login';
import SignUp from '../components/auth/signup/SignUp';
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
import AboutUs from '../components/aboutUs/AboutUs';
import ContactUs from '../components/contactUs/ContactUs';
import PrivateRoute from '../components/protectedRoutes/PrivateRoute';
import Auth from '../components/protectedRoutes/Auth';
import ResetPassword from '../components/auth/resetPassword/ResetPassword';
import ForgotPassword from '../components/auth/forgotPassword/ForgotPassword';
import ResetPasswordProtectingRoute from '../components/protectedRoutes/ResetPasswordProtectingRoute';
import NotFound404 from '../components/notFound404/NotFound404';
import Dashboard from '../dashboard/Dashboard';
import DashboardProducts from '../dashboard/dashboardComponents/products/DashboardProducts';
import DashboardUsers from '../dashboard/dashboardComponents/users/DashboardUsers';
import DashboardOrders from '../dashboard/dashboardComponents/orders/DashboardOrders';
import DashboardReviews from '../dashboard/dashboardComponents/reviews/DashboardReviews';
import DashboardInvoices from '../dashboard/dashboardComponents/invoices/DashboardInvoices';
import DashboardBrands from '../dashboard/dashboardComponents/brands/DashboardBrands';
import DashboardCategories from '../dashboard/dashboardComponents/categories/DashboardCategories';
import CreateCategory from '../dashboard/dashboardComponents/categories/CreateCategory';
import CreateBrand from '../dashboard/dashboardComponents/brands/CreateBrand';
import CreateUser from '../dashboard/dashboardComponents/users/CreateUser';
import CreateProduct from '../dashboard/dashboardComponents/products/CreateProduct';
import PatchImagesToProduct from '../dashboard/dashboardComponents/products/PatchImagesToProducts';


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
                path: "/checkout/:orderId",
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
            },
            {
                path: "*",
                element: <NotFound404 />
            }, {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "products",
                        element: <DashboardProducts />
                    },
                    {
                        path: "products/create",
                        element: <CreateProduct />
                    },
                    {
                        path: "users",
                        element: <DashboardUsers />
                    },
                    {
                        path: "users/create",
                        element: <CreateUser />
                    },
                    {
                        path: "orders",
                        element: <DashboardOrders />
                    },
                    {
                        path: "reviews",
                        element: <DashboardReviews />
                    },
                    {
                        path: "invoices",
                        element: <DashboardInvoices />
                    },
                    {
                        path: "brands",
                        element: <DashboardBrands />
                    },
                    {
                        path: "brands/create",
                        element: <CreateBrand />
                    },
                    {
                        path: "categories",
                        element: <DashboardCategories />,
                    }, {
                        path: "categories/create",
                        element: <CreateCategory />,
                    }
                ]
            }
        ]
    }
])
