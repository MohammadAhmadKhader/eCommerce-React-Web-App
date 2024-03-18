import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalCachingContext } from '../../../features/GlobalCachingContext/GlobalCachingProvider';
import OneLineSkeleton from '../../../shared/LoadingSkeletons/OneLineSkeleton';
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';


export default function CategoriesFilter() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { categories, isCategoriesLoading } = useContext(GlobalCachingContext);
    const { theme } = useContext(ThemeContext)

    return (
        <div>
            <RadioGroup
                aria-labelledby="categories-buttons-group-label"
                defaultValue="Skincare"
                name="category"
                onChange={(e, newValue) => {
                    if (newValue != "") {
                        searchParams.set("category", newValue);
                        setSearchParams(searchParams)
                    } else {
                        searchParams.delete("category");
                        setSearchParams(searchParams)
                    }

                }}
            >
                {isCategoriesLoading ? <div className='flex flex-col gap-5'>
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                    <OneLineSkeleton />
                </div> : <>
                    <FormControlLabel value="" checked={!searchParams.get("category") ? true : false} control={<Radio sx={{
                                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                                    '&.Mui-checked': {
                                        color: "var(text-color-accent)",
                                    },
                                }} />} label="All Categories" />
                    {categories?.map((category) => {
                        return (
                            <FormControlLabel value={category._id}
                                checked={searchParams.get("category") == category._id ? true : false}
                                control={<Radio sx={{
                                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                                    '&.Mui-checked': {
                                        color: "var(text-color-accent)",
                                    },
                                }} />}
                                label={category.name} key={category._id} />
                        )
                    })}</>
                }
            </RadioGroup>
        </div>
    );
}