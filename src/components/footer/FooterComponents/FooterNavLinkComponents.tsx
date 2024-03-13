import { Link } from 'react-router-dom'
import { IFooterNavLinkComponentsProps } from '../../../types/types'

function FooterNavLinkComponents({ Href = "", text }: IFooterNavLinkComponentsProps) {
    return (
        <Link to={`${Href}`} className='opacity-65 hover:opacity-100 duration-300'>
            {text}
        </Link>
    )
}

export default FooterNavLinkComponents