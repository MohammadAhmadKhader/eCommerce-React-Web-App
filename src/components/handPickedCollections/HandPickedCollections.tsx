import React from 'react'
import SingleHandpickedCollection from './SingleHandpickedCollection'

function HandPickedCollections() {
    return (
        <section className='px-4 my-10 p-10' style={{ backgroundColor: "rgb(7, 89, 133)" }}>
            <h2 className='text-xl font-semibold md:text-2xl lg:text-3xl md:font-bold mb-5 text-white'>Handpicked Collections</h2>
            <div className='grid grid-cols-12 justify-between items-center gap-4 md:gap-8 mt-4'>
                <SingleHandpickedCollection title='Personal Care' img="./HandPickedCollections/PersonalCare-min.jpg" to="/"/>
                <SingleHandpickedCollection title='Handbags' img="./HandPickedCollections/Handbag_1_35.png" to="/"/>
                <SingleHandpickedCollection title='Wrist Watches' img="./HandPickedCollections/WristWatch_800x800.png" to="/"/>
                <SingleHandpickedCollection title='Sun Glasses' img="./HandPickedCollections/Sunglasses_2_35.png" to="/"/>
            </div>
        </section>
    )
}

export default HandPickedCollections