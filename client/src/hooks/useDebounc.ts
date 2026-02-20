import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 600) => {
    const [debounce, setDebounce] = useState<T>(value)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debounce
}