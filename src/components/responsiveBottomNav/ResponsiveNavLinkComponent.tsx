import { Link } from 'react-router-dom'
import { IResponsiveNavLinkComponentProps } from '../../types/types'

function ResponsiveNavLinkComponent({ IconComponent, Text, Size = 25, Href = "/" }: IResponsiveNavLinkComponentProps) {
  return (
    <li>
      <Link to={Href} className='group flex flex-col items-center h-full justify-end duration-300' >
        <IconComponent size={Size} className=' duration-300 group-hover:opacity-80' />
        <span className='text-sm font-semibold invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300'>{Text}</span>
      </Link>
    </li>
  )
}

export default ResponsiveNavLinkComponent