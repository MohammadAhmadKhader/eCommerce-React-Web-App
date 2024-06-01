import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider';

export interface IAsideNavElement {
  linksArray: {
    to: string;
    text: string;
  }[];
}
//  to={"/dashboard/orders?page=1&limit=20"}
export default function SidebarNavElement({ linksArray = [] }: IAsideNavElement) {
  const { theme } = useContext(ThemeContext);
  return (
    <nav className='flex flex-col gap-y-1.5 border-t border-opacity-10 py-2'>
      {linksArray.map((link, index) => {
        return (
          <Link key={index} className={`font-semibold duration-300 ${theme === "dark" ? "hover:bg-slate-100" : "hover:bg-slate-400"} hover:bg-opacity-10 rounded-md px-1 py-0.5`}
            to={link.to}
          >
            {link.text}
          </Link>
        )
      })

      }
    </nav>
  )
}

