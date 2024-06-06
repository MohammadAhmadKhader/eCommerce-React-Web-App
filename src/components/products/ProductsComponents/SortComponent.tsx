import SelectSort from './SelectSort'
import { ISortComponent } from '../../../types/types'

function SortComponent({ customClasses }: ISortComponent) {
  return (
    <div className={`flex flex-grow items-center xl:w-4/12 w-full lg:justify-end ${customClasses}`}>
      <span className="me-1 text-white whitespace-nowrap">
        Sort by :
      </span>
      <SelectSort />
    </div>
  )
}

export default SortComponent