import { useContext, useEffect, useRef, useState } from 'react'
import SearchIcon from "../headerComponents/SearchIcon";
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import useDebounce from '../../customHooks/useDebounce';

function SearchComponent() {

    // let searchInputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useContext(ThemeContext)
    const { debounce, debouncedData } = useDebounce()
    useEffect(() => {
        console.log("This data was debounced", debouncedData)
    }, [debouncedData])

    return (
        <search className="block max-w-fit my-2 rounded-lg">
            <div className="flex items-center rounded-lg bg-transparent w-full px-3 search-field py-0.5 duration-500 border border-solid" style={{
                outlineColor: isFocused ? theme == "dark" ? "var(--dark--outline--color)" : "var(--light--outline--color)" : "",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"
            }}>
                <input id="searchInput" className="border-none outline-none bg-transparent py-1" type="text" placeholder="Search Products"

                    onFocus={(e) => {
                        setIsFocused(true);
                        const searchFieldDiv = e.target.closest(".search-field");
                        searchFieldDiv?.classList.add("outline", "outline-1");
                        const searchIcon = searchFieldDiv?.querySelector("svg");
                        searchIcon?.classList.add("w-0");
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        const searchFieldDiv = e.target.closest(".search-field");
                        searchFieldDiv?.classList.remove("outline", "outline-1");
                        const searchIcon = searchFieldDiv?.querySelector("svg");
                        searchIcon?.classList.remove("w-0");
                    }}
                    onChange={(e) => {
                        debounce(() => {return e.target.value}, 1000)
                    }}
                />
                <SearchIcon IdName={'searchInput'} />
            </div>
        </search>
    )
}

export default SearchComponent