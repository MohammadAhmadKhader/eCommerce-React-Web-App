import { FaChevronRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { IProfileNavLinkComponents } from '../../../types/types'

function ProfileNavLinkComponents({ title, href }: IProfileNavLinkComponents) {
    return (
        <NavLink title={title} className={"flex justify-between items-center py-2 duration-300 text-black"} to={href}>
            <h4 className='md:text-base md:line-clamp-1 lg:text-lg ps-2 font-semibold'>{title}</h4>
            <span>
                <FaChevronRight />
            </span>
        </NavLink>
    )
}

export default ProfileNavLinkComponents
