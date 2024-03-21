import { useContext, useEffect, useState } from 'react'
import "./products.css"
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'
import ProductWithRatingsCard from './ProductsComponents/ProductWithRatingsCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link, useBlocker, useLocation, useSearchParams } from 'react-router-dom'
import FiltersComponent from './ProductsComponents/FiltersComponent.tsx'
import SortComponent from './ProductsComponents/SortComponent.tsx'
import ResponsiveSortFilterControl from './ProductsComponents/ResponsiveSortFilterControl.tsx'
import { WindowWidthContext } from '../features/WindowWidthFeature/WindowWidthProvider.tsx'
import ProductsPageSkeleton from '../shared/LoadingSkeletons/ProductsPageSkeleton.tsx'
import { IoChevronForwardOutline } from "react-icons/io5";
import useAxios from '../customHooks/useAxios.tsx'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../customHooks/useDebounce.tsx'
import { objectIdSchemaOptional } from '../shared/IdValidation.ts'
import { GlobalCachingContext } from '../features/GlobalCachingContext/GlobalCachingProvider.tsx'

function Products() {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const { windowWidth } = useContext(WindowWidthContext)
    const [isResponsiveFilterActive, setIsResponsiveFilterActive] = useState(false);
    const [isResponsiveSortActive, setIsResponsiveSortActive] = useState(false);
    const [shouldItBeRendered, setShouldItBeRendered] = useState<boolean | null>(null);
    const { setIsLoading, GET, isLoading } = useAxios()
    const [count, setCount] = useState(9);
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All Categories");
    const { categories, isCategoriesLoading } = useContext(GlobalCachingContext)
    const maxLimit = 30;
    const minLimit = 9;
    const { debounce } = useDebounce()

    const getLimitValue = () => {
        let limit = searchParams.get("limit");
        if (parseInt(searchParams.get("limit")) > maxLimit) {
            limit = maxLimit.toString()
        }
        if (parseInt(searchParams.get("limit")) < minLimit) {
            limit = minLimit.toString()
        }
        if (parseInt(searchParams.get("limit")) > count) {
            limit = count.toString()
        }
        return limit
    }
    const getData = async (params) => {
        try {
            setIsLoading(true)
            const { data } = await GET(`/products?${params}`)
            setProducts(data.products)
            console.log(data.products)
            setCount(data.count);
            console.log("SENT")
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (searchParams.get("category")) {
            const { error } = objectIdSchemaOptional.validate({ categoryId: searchParams.get("category") })
            if (error) {
                navigate("/")
            }
        }

        if (!searchParams.get("limit") || !searchParams.get("page")) {
            searchParams.set("limit", "9");
            searchParams.set("page", "1");
            setSearchParams(searchParams)
        }


    }, [])


    useEffect(() => {
        if (parseInt(searchParams.get("limit")) > maxLimit) {
            searchParams.set("limit", maxLimit.toString())
            setSearchParams(searchParams)
        }
        if (parseInt(searchParams.get("limit")) < minLimit) {
            searchParams.set("limit", minLimit.toString())
            setSearchParams(searchParams)
        }
        if (searchParams.get("category")) {
            const { error } = objectIdSchemaOptional.validate({ categoryId: searchParams.get("category") })
            if (error) {
                navigate("/")
            }
        }
        if (!searchParams.get("limit") || !searchParams.get("page")) {
            searchParams.set("limit", "9");
            searchParams.set("page", "1");
            setSearchParams(searchParams)
        }

        const brands = searchParams.getAll("brands");
        const sort = searchParams.get("sort");
        const offer = searchParams.get("offer");
        const available = searchParams.get("available");
        const price_lte = searchParams.get("price_lte");
        const price_gte = searchParams.get("price_gte");


        const params = {
            brand: brands ? brands : "",
            sort: sort ? sort : "",
            available: available ? available : "",
            offer: offer ? offer : "",
            price_lte: price_lte ? price_lte : "",
            price_gte: price_gte ? price_gte : "",
            page: searchParams.get("page") || 9,
            limit: searchParams.get("limit") || 1,
            category: searchParams.get("category") ? searchParams.get("category") : undefined,
        }

        let linkPath = "";
        for (const value in params) {
            if (params[value]?.length > 0) {
                linkPath = linkPath + value + "=" + (value == "brand" ? JSON.stringify(params[value]) : params[value]) + "&";
            }
        }

        if (!isCategoriesLoading) {
            categories.forEach((category) => {
                if (category._id == searchParams.get("category")) {
                    setCategory(category.name)
                }
                if (!searchParams.get("category")) {
                    setCategory("All Categories")
                }
            })
        }

        linkPath = linkPath.slice(0, -1)
        debounce(() => { getData(linkPath) }, 500)
    }, [searchParams])

    useEffect(() => {
        if (windowWidth < 768) {
            setShouldItBeRendered(false)
        } else {
            setShouldItBeRendered(true)
        }
    }, [windowWidth])

    return (
        <section className='products'>
            <div className='w-full px-4 my-5'>
                <div className='bg-cover h-[450px] bg-no-repeat w-full black-friday-img-section relative rounded-xl' style={{
                    backgroundImage: `url(https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/injorsgpdrfl6gpdcjmo)`
                }} >
                    <div className='text-5xl lg:text-7xl text-black absolute top-2/3 -translate-y-52 
                    text-black-friday-img-section rounded-xl mx-1 sm:mx-3 p-5 lg:p-10 bg-white bg-opacity-25 select-none'>
                        <span className='font-bold'>UPTO 70% OFF</span> <br />
                        BLACK FRIDAY
                    </div>
                </div>
            </div>

            <div className='px-4 flex items-center gap-x-4 text-color-accent font-semibold my-5'>
                <Link to="/">
                    Home
                </Link>
                <IoChevronForwardOutline />
                <Link to="/products">
                    {category}
                </Link>
            </div>
            <div className='px-4 text-color-accent'>
                <h2 className='text-4xl mb-5 font-semibold'>
                    {category}
                </h2>
            </div>
            <div className='flex'>
                {shouldItBeRendered && <FiltersComponent />}
                <div className='px-3 md:ps-1 md:me-1.5 lg:px-3 xl:px-4 w-full'>
                    <div className='my-3'>
                        <div className={`flex flex-wrap justify-between items-center px-2 py-1.5 rounded-lg gap-y-3 accent-text-color accent-bg-color`}
                            style={{
                                backgroundColor: "rgb(29,155,240)"
                            }}>
                            <p className='xl:w-4/12 sm:w-auto w-full text-white'>Showing {(parseInt(searchParams.get("limit")) * parseInt(searchParams.get("page"))) - parseInt(searchParams.get("limit")) + 1} - {parseInt(searchParams.get("limit")) * parseInt(searchParams.get("page"))} of {count} items</p>

                            <p className='flex items-center gap-x-2 sm:justify-end xl:justify-center xl:w-4/12 sm:w-auto w-full'>
                                <span className=' text-white'>Products : </span>
                                <input className='rounded-md size-10 outline-none text-black text-center border'
                                    type="number" defaultValue={getLimitValue()}
                                    onChange={(e) => {
                                        const element = e.target;
                                        debounce(() => {
                                            navigate(`/products?page=1&limit=${element.value}`)
                                        }, 500)

                                    }}
                                    onKeyUp={(e) => {
                                        const element = e.target as HTMLInputElement;

                                        if (Number(element.value) > maxLimit) {
                                            element.value = maxLimit.toString()
                                        }
                                        if (Number(element.value) > count) {
                                            element.value = count.toString()
                                        }
                                        if (Number(element.value) < minLimit) {
                                            element.value = minLimit.toString()
                                        }
                                    }}

                                />
                            </p>
                            <SortComponent customClasses='hidden md:flex' />
                            <ResponsiveSortFilterControl
                                isResponsiveFilterActive={isResponsiveFilterActive}
                                setIsResponsiveFilterActive={setIsResponsiveFilterActive}
                                isResponsiveSortActive={isResponsiveSortActive}
                                setIsResponsiveSortActive={setIsResponsiveSortActive}
                                FilterComponent={FiltersComponent}
                                SortComponent={SortComponent}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-2 lg:gap-5'>
                        {isLoading ? <ProductsPageSkeleton /> :
                            products?.length > 0 ? products?.map((prod) => {
                                return (
                                    <ProductWithRatingsCard name={prod.name} finalPrice={prod.finalPrice} price={prod.price} _id={prod._id}
                                        brand={prod.brand} avgRating={prod.avgRating} offer={prod.offer} key={prod._id} imageUrl={prod.images[0].imageUrl} ratingNumbers={prod.ratingNumbers} quantity={prod.quantity} />
                                )

                            }) : <div className='min-w-56'>
                                <h3 className='text-xl font-semibold'>No Products Available</h3>
                            </div>
                        }
                    </div>

                    <Stack spacing={2} sx={{
                        bgcolor: theme === "dark" ? "var(--light--bgCard--color)" : "var(--dark--bgCard--color)",
                        maxWidth: "fit-content",
                        marginBlock: "10px",
                    }}
                        style={{
                            boxShadow: theme == "dark" ? "var(--dark--boxShadowCard)" : "var(--light--boxShadowCard)",
                        }}>
                        <Pagination count={Math.ceil(count / parseInt(searchParams.get("limit")))}
                            onChange={(event, value) => {
                                if (Number(searchParams.get("page")) <= Number(Math.ceil(count / parseInt(searchParams.get("limit"))))) {
                                    searchParams.set("page", value.toString())
                                    setSearchParams(searchParams);
                                  }
                            }}
                        />
                    </Stack>
                </div>
            </div>
        </section>
    )
}

export default Products