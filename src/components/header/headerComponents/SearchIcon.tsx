import { useContext } from "react"
import { ThemeContext } from "../../features/ThemeFeature/ThemeProvider"
import { ISearchIcon } from "../../../types/types";

function SearchIcon({IdName} : ISearchIcon) {
    const {theme} = useContext(ThemeContext);
    const iconColor = theme == "dark" ? "white" : "black"
    
    return ( 
        <label htmlFor={`${IdName}`}>
            <svg className='duration-500 hover:cursor-pointer' width={21} height={20} viewBox="0 0 26 26" fill={iconColor} xmlns="http://www.w3.org/2000/svg">
                <path d="M24.9054 21.6162L19.9884 16.748C19.7665 16.5283 19.4656 16.4063 19.15 16.4063H18.3461C19.7073 14.6826 20.5161 12.5146 20.5161 10.1563C20.5161 4.5459 15.9246 0 10.258 0C4.59146 0 0 4.5459 0 10.1563C0 15.7666 4.59146 20.3125 10.258 20.3125C12.6401 20.3125 14.8298 19.5117 16.5707 18.1641V18.96C16.5707 19.2725 16.694 19.5703 16.9159 19.79L21.8329 24.6582C22.2965 25.1172 23.0461 25.1172 23.5047 24.6582L24.9004 23.2764C25.364 22.8174 25.364 22.0752 24.9054 21.6162ZM10.258 16.4063C6.7713 16.4063 3.9454 13.6133 3.9454 10.1563C3.9454 6.7041 6.76637 3.90625 10.258 3.90625C13.7448 3.90625 16.5707 6.69922 16.5707 10.1563C16.5707 13.6084 13.7497 16.4063 10.258 16.4063Z" 
                fill={iconColor} />
            </svg>
        </label>
    )
}

export default SearchIcon