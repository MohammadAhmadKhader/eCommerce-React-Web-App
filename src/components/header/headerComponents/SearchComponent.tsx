import { useContext, useEffect, useRef, useState } from 'react'
import SearchIcon from "../headerComponents/SearchIcon";
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import useDebounce from '../../customHooks/useDebounce';
import useAxios from '../../customHooks/useAxios';
import { Link } from 'react-router-dom';
import CircularLoader from '../../shared/CircularLoader';

function SearchComponent() {

    const [isFocused, setIsFocused] = useState(false);
    const [inputText, setInputText] = useState("")
    const { theme } = useContext(ThemeContext)
    const { debounce } = useDebounce()
    const { GET, isLoading: isSearchUnderProcessing, setIsLoading: setIsSearchUnderProcessing } = useAxios()
    const [searchedProducts, setSearchedProducts] = useState([]);
    const inputRef = useRef(null);
    const searchRef = useRef(null)

    const searchForProducts = async (textToSearch: string) => {
        try {
            const { data } = await GET(`/products?page=1&limit=12&search=${textToSearch}`);
            console.log(data)
            setSearchedProducts(data.products)
            return data;
        } catch (error) {
            console.log(error)
        } finally {
            setIsSearchUnderProcessing(false)
        }
    }

    useEffect(() => {
        const searchListener = (event) => {
            if (event.target == searchRef.current) {
                setInputText("")
            }
            if (event.target != inputRef.current && event.target != searchRef.current) {
                setSearchedProducts([]);
                setInputText("")
            }
        }
        if (searchedProducts.length > 0) {
            window.addEventListener("click", searchListener)
        }
        if (searchedProducts.length == 0) {
            removeEventListener("click", searchListener);
        }

    }, [searchedProducts])

    useEffect(() => {
        if (inputText) {
            debounce(() => {
                searchForProducts(inputText)
            }, 400)
        }
    }, [inputText])

    return (
        <search className="block max-w-fit my-2 rounded-lg relative">
            <div ref={inputRef} className="flex items-center rounded-lg bg-transparent w-full px-3 search-field py-0.5 duration-500 border border-solid" style={{
                outlineColor: isFocused ? theme == "dark" ? "var(--dark--outline--color)" : "var(--light--outline--color)" : "",
                borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"
            }}>
                <input id="searchInput" className="border-none outline-none bg-transparent py-1 text-sm"
                    value={inputText}
                    type="text" placeholder="Search Products..."

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
                        setIsSearchUnderProcessing(true)
                        setInputText(e.target.value)
                    }}
                />
                <div onClick={() => {
                    setSearchedProducts([])
                }}>
                    <SearchIcon IdName={'searchInput'} />
                </div>
            </div>
            {searchedProducts.length >= 0 && inputText.length > 0 &&
                <div ref={searchRef} className={`absolute min-w-[250px] md:min-w-[350px] z-20 right-[1px]  top-[36px] rounded-md overflow-hidden border`} style={{
                    backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"

                }}>
                    <ul className='max-h-[330px] overflow-y-scroll flex flex-col gap-1.5 px-1'>
                        {!isSearchUnderProcessing && searchedProducts?.map((prod) => {
                            return (
                                <li>
                                    <Link to={`/products/${prod._id}`} className={`relative flex gap-x-2 duration-300 
                                    rounded-md before:absolute before:w-full before:h-full 
                                    before:rounded-md ${theme == "dark" ? "before:hover:bg-white before:hover:bg-opacity-[0.1]" : "before:hover:bg-black before:hover:bg-opacity-[0.03]"} before:hover:bg-black before:hover:bg-opacity-[0.03] before:duration-300`}>
                                        <div className='flex-shrink-0 py-1'>
                                            <img src={prod.images[0].imageUrl} alt={prod.name}
                                                className='w-[70px]  object-contain rounded-md border'
                                                style={{
                                                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)"
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className='flex flex-col'>
                                                <h3 className='text-[13px] font-semibold'>Name: {prod.name}</h3>
                                                <h3 className='text-[13px] font-semibold'>Brand: {prod.brand}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                    {isSearchUnderProcessing ? <div className='text-center py-3'><CircularLoader minHeight={5} /></div> : <div className='text-center py-3'>Search results 0..</div>}
                </div>
            }
        </search>
    )
}

export default SearchComponent