import "./aboutUs.css"

function AboutUs() {
    return (
        <section className='mb-24'>
            <div className='aboutUs-bg w-full h-[600px] relative'
            style={{backgroundImage:"url(https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/ywskwv3aflgz4ayt7ynd)"}}>
                <div className='absolute right-0 md:right-20 top-1/4 w-72 sm:w-96 text-black select-none'>
                    <h2 className='text-5xl md:text-7xl font-semibold tracking-wider'>
                        ABOUT
                    </h2>
                    <p className='mt-6 tracking-wider'>
                        Lorem Ipsum is simply dummy text of the printing. Lorem Ipsum is simply dummy text of the printing.
                    </p>
                </div>

                <div className='h-full aboutUs-linear lg:w-8/12 xl:w-6/12 ms-auto'>

                </div>
            </div>

            <div className='px-4'>
                <div className='md:w-3/5 text-center mx-auto my-10 tracking-wider'>
                    <h3 className='text-2xl font-semibold mb-2'>About</h3>
                    <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem rem
                        dolorum deleniti corrupti laudantium dolore, consectetur ea et distinctio eligendi accusantium aliquid
                        repellat ipsa quas nemo placeat aut ducimus, id quo recusandae tenetur aliquam
                        ipsum! Aliquam blanditiis ducimus vitae a eveniet ad saepe architecto unde!
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-12 gap-5 mt-8'>
                        <div className='col-span-12 md:col-span-5 flex flex-col justify-center'>
                            <h3 className='text-2xl font-semibold mb-2'>About</h3>
                            <div>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem rem
                                dolorum deleniti corrupti laudantium dolore, consectetur ea et distinctio eligendi accusantium aliquid
                                repellat ipsa quas nemo placeat aut ducimus, id quo recusandae tenetur aliquam
                                ipsum! Aliquam blanditiis ducimus vitae a eveniet ad saepe architecto unde!
                            </div>
                        </div>

                        <div className='col-span-12 md:col-span-7'>
                            <img className='object-cover max-h-[300px] w-full blur-sm'
                                src="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/kkqreaeuwjarazkguio7"
                                alt="Handbags"
                                onLoad={(e) => {
                                    const Img = e.currentTarget
                                    Img.classList.remove("blur-sm")
                                }} />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-5 mt-8'>
                        <div className='col-span-12 md:col-span-7'>
                            <img className='object-cover max-h-[300px] w-full blur-sm'
                                src="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/qhitz3xevdyxdyafc2hn"
                                alt="SmartWatch" onLoad={(e) => {
                                    const Img = e.currentTarget
                                    Img.classList.remove("blur-sm")
                                }} />
                        </div>

                        <div className='col-span-12 md:col-span-5 flex flex-col justify-center'>
                            <h3 className='text-2xl font-semibold mb-2'>About</h3>
                            <div>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem rem
                                dolorum deleniti corrupti laudantium dolore, consectetur ea et distinctio eligendi accusantium aliquid
                                repellat ipsa quas nemo placeat aut ducimus, id quo recusandae tenetur aliquam
                                ipsum! Aliquam blanditiis ducimus vitae a eveniet ad saepe architecto unde!
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-5 mt-8'>
                        <div className='col-span-12 md:col-span-5 flex flex-col justify-center'>
                            <h3 className='text-2xl font-semibold mb-2'>About</h3>
                            <div>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem rem
                                dolorum deleniti corrupti laudantium dolore, consectetur ea et distinctio eligendi accusantium aliquid
                                repellat ipsa quas nemo placeat aut ducimus, id quo recusandae tenetur aliquam
                                ipsum! Aliquam blanditiis ducimus vitae a eveniet ad saepe architecto unde!
                            </div>

                        </div>
                        <div className='col-span-12 md:col-span-7'>
                            <img className='object-cover max-h-[300px] w-full blur-sm'
                                src="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/lst3plh0drg9tlkspfc6"
                                alt="Sun glasses" onLoad={(e) => {
                                    const Img = e.currentTarget
                                    Img.classList.remove("blur-sm")
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
