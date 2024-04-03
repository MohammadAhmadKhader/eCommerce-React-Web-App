import { useSearchParams } from 'react-router-dom';
import CheckboxInput from './CheckboxInput';
import { useContext, useEffect } from 'react';
import OneLineSkeleton from '../../../shared/LoadingSkeletons/OneLineSkeleton';
import { GlobalCachingContext } from '../../../features/GlobalCachingContext/GlobalCachingProvider';


const BrandForm = () => {
    const {brands,isBrandsLoading,getBrands} =useContext(GlobalCachingContext);
    useEffect(() => {
        getBrands()
    }, [])
    const [searchParams, setSearchParams] = useSearchParams()
    const handleCheckBox = (event, text) => {
        const brands = searchParams.get("brands");
        if (!brands) {
            searchParams.set("brands", text)
            setSearchParams(searchParams)

        } else {
            if (!searchParams.has("brands", text)) {
                searchParams.append("brands", text)
                setSearchParams(searchParams);

            } else {
                searchParams.delete("brands", text);
                setSearchParams(searchParams);

            }

        }
    }
    const checkStateController = (text) => {
        const doesNameExistInUrl = searchParams.getAll("brands").includes(text) ? true : false
        return doesNameExistInUrl
    }

    return (
        <div className='flex flex-col justify-center'>
            {isBrandsLoading ?
                <div className='flex flex-col gap-5'>
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                </div> : brands?.map((brand) => {
                    return (
                        <div className='flex items-center' key={brand._id}>
                            <CheckboxInput text={brand.name} id={brand.name}
                                stateController={checkStateController} handleCheckBox={handleCheckBox} />
                        </div>
                    )
                })}
        </div>
    )
}

export default BrandForm
