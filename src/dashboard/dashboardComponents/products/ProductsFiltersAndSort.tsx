import { useSearchParams } from 'react-router-dom'
import SelectInput from '../dashboardShared/SelectInput'

function ProductsFiltersAndSort() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortingFields = [
        {
            sort: "price_desc",
            action: "Price high to low",
        },
        {
            sort: "price_asc",
            action: "Price low to high",
        },
    ]
    function handleChange(event: KeyboardEvent | MouseEvent | FocusEvent, value: any): void {

        searchParams.set("sort", value);
        setSearchParams(searchParams);
    }
    return (
        <div className='mb-2'>
            <SelectInput handleChange={handleChange as unknown as any} placeholder='sort fields' disabledOption
                optionName={"action"} optionValue={"sort"} optionsArray={sortingFields} name="sort" />
        </div>
    )
}

export default ProductsFiltersAndSort