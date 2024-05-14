import {  useRef, useState } from "react";

export default function useDebounce() {
    let debounceRef = useRef(null);
    const [debouncedData,setDebouncedData] = useState(null)
    
    const debounce = (functionToDebounce, delay = 500) => {
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
           const result = functionToDebounce()
           setDebouncedData(result)
        }, delay)
        
    }
    
    return { debouncedData,debounce}
}