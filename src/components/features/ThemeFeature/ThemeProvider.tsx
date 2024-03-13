import { createContext, useState, ReactNode, FC, useEffect } from 'react'
import { IThemeContextType } from '../../../types/types';

export const ThemeContext = createContext<IThemeContextType>({
    theme: "dark",
    toggleTheme: () => { }

});

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("themeMode") || "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

    }
    useEffect(() => {
        localStorage.setItem("themeMode", theme)
    }, [theme])

    useEffect(() => {
        const themeMode = localStorage.getItem("themeMode");
        if (themeMode == "dark") {
            setTheme("dark")
        } else if (themeMode == "light") {
            setTheme("light")
        }
    }, [])


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{
                backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;