import { Link } from 'react-router-dom';
import { ISingleHandPickedCollection } from '../../types/types';


function SingleHandpickedCollection({ title, img,to="/" }: ISingleHandPickedCollection) {
    return (
        <Link to={to} className='col-span-12 sm:col-span-6 xl:col-span-3'>
            <div className='relative'>
                <img src={img} alt={title} className='rounded-lg aspect-square object-cover w-full' />
                <h3 className='text-black text-2xl font-semibold lg:font-bold p-3 absolute left-2 bottom-2'>{title}</h3>
            </div>
        </Link>
    )
}

export default SingleHandpickedCollection