import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider'
import { IFooterContactsLinksProps } from '../../../types/types'


function FooterContactsLinks({ LogoComponent, Size = 20, Href = "/" }: IFooterContactsLinksProps) {
    const { theme } = useContext(ThemeContext)
    return (
        <li className='text-black size-9 rounded-full flex items-center justify-center opacity-65 duration-300 hover:opacity-100' style={{
            color: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
            backgroundColor: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
        }}>
            <Link to={`${Href}`}>
                <LogoComponent size={Size} />
            </Link>
        </li>
    )
}

export default FooterContactsLinks