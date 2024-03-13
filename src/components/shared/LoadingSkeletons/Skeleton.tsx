import SingleSkeleton from './SingleSkeleton';

export default function LoadingSkeleton() {
    return (
        <div className='grid grid-cols-12 px-4 gap-x-4'>
            <div className='col-span-12 sm:col-span-6 xl:col-span-3'>
                <SingleSkeleton />
            </div>

            <div className='col-span-12 sm:col-span-6 xl:col-span-3'>
                <SingleSkeleton />
            </div>

            <div className='col-span-12 sm:col-span-6 xl:col-span-3'>
                <SingleSkeleton />
            </div>

            <div className='col-span-12 sm:col-span-6 xl:col-span-3'>
                <SingleSkeleton />
            </div>
        </div>
    );
}