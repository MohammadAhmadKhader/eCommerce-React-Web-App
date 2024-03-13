import FiltersList from './FiltersList'
import BrandFilter from './asideFilters/BrandFilter.tsx'
import PriceRangeFilter from './asideFilters/PriceRangeFilter'
import DiscountFilter from './asideFilters/DiscountFilter'
import AvailabilityFilter from './asideFilters/AvailabilityFilter'
import { IFiltersComponent } from '../../../types/types'

function FiltersComponent({ customClasses }: IFiltersComponent) {
    return (
        <aside className={`min-w-60 lg:min-w-96 px-3 ${customClasses}`}>
            <FiltersList title="Brand" FilterComponent={BrandFilter} />
            <FiltersList title="Price Range (USD)" FilterComponent={PriceRangeFilter} />
            <FiltersList title="Discount" FilterComponent={DiscountFilter} />
            <FiltersList title="Availability" FilterComponent={AvailabilityFilter} />
        </aside>

    )
}

export default FiltersComponent