import TopCategoriesCarousel from "./TopCategoriesCarousel"

function ResponsiveTopCategories() {
    const categoriesResponse = {
        "message": "success",
        "count": 5,
        "categories": [
            {
                "id": 1,
                "name": "Skincare",
                "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035673/eCommerceTap/Categories/ypycq2m497dhga7umjhfSkincare.svg"
            },
            {
                "id": 2,
                "name": "Watches",
                "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035742/eCommerceTap/Categories/zood7r05af5otd2qbczlWatches.svg"
            },
            {
                "id": 3,
                "name": "Jewellery",
                "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035610/eCommerceTap/Categories/bl1jpdtswba46sasy12pJewellery.svg"
            },
            {
                "id": 4,
                "name": "Handbags",
                "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035726/eCommerceTap/Categories/aolvbrqkj1xjh48csyotHandbags.svg"
            },
            {
                "id": 5,
                "name": "Eyewear",
                "image_secure_url": "https://res.cloudinary.com/doxhxgz2g/image/upload/v1706035673/eCommerceTap/Categories/ypycq2m497dhga7umjhfSkincare.svg"
            }
        ]
    }
    return (
        <section className='block md:hidden px-4 my-5'>
            <h2 className='text-xl font-semibold clear-start mb-5'>Top Categories</h2>
            <div className='flex justify-between gap-x-3'>
                <TopCategoriesCarousel Iterable={categoriesResponse.categories}/>
            </div>
        </section>
    )
}

export default ResponsiveTopCategories