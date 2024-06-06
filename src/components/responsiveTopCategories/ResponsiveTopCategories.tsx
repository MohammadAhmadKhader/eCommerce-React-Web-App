import { useContext } from "react"
import TopCategoriesCarousel from "./TopCategoriesCarousel"
import { GlobalCachingContext } from "../features/GlobalCachingContext/GlobalCachingProvider"

function ResponsiveTopCategories() {
    const { categories } = useContext(GlobalCachingContext);
    
    return (
        <section className='block md:hidden px-4 my-5'>
            <h2 className='text-xl font-semibold clear-start mb-5'>Top Categories</h2>
            <div className='flex justify-between gap-x-3'>
                <TopCategoriesCarousel Iterable={categories} />
            </div>
        </section>
    )
}

export default ResponsiveTopCategories