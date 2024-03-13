import SelectSort from './SelectSort'
import { ISortComponent } from '../../../types/types'

function SortComponent({ customClasses }: ISortComponent) {
  return (
    <p className={`flex flex-grow items-center xl:w-4/12 w-full lg:justify-end ${customClasses}`}>
      <span className="me-1 text-white">
        Sort by :
      </span>
      <SelectSort />
    </p>
  )
}

export default SortComponent