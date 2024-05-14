import React, { useContext } from 'react'
import { ThemeContext } from '../../../components/features/ThemeFeature/ThemeProvider'

function TableWidthScrolling({ children }) {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`overflow-auto ${theme === "light" ? "shadow-lg" : "shadow-md shadow-gray-600"} `}>
            {children}
        </div>
    )
}

export default TableWidthScrolling