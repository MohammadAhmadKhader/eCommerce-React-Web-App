import React, { useContext } from 'react'
import { ThemeContext } from '../features/ThemeFeature/ThemeProvider'

function WebsiteLogo() {
    const { theme } = useContext(ThemeContext)
    const logoColor = theme == "dark" ? "white" : "black"
    return (
        <svg className='select-none' xmlns="http://www.w3.org/2000/svg" width={170} height={53} viewBox="0 0 170 53" fill="none">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="41" fontWeight="bold"
                fill={logoColor}>GoStore</text>
        </svg>
    )
}

export default WebsiteLogo