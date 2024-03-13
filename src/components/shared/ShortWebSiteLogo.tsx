import React, { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'

interface IShortWebSiteLogoProps {
    windowWidth?:string;
}

function ShortWebSiteLogo({windowWidth} : IShortWebSiteLogoProps) {
    const { theme } = useContext(ThemeContext);
    const logoColor = theme == "dark" ? "white" : "black";
    const width = Number(windowWidth) > 768 ? 47 : 37;
    return (
        <svg className='select-none' xmlns="http://www.w3.org/2000/svg" width={width} height={63} viewBox="0 0 30 40" fill="none">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fontFamily="Arial" fontWeight="bold"
                fill={logoColor}>G</text>
        </svg>
    )
}

export default ShortWebSiteLogo