import React, { useState, useEffect, useRef } from 'react'
function useDebounce(value,delay=1000) {
    const [getSearch, setSearch] = useState(value)


    useEffect(() => {
        console.log(value)
        const timer = setTimeout(() => {
            setSearch(value)
        }, 1000)

        return ()=>clearTimeout(timer)
    }, [value,delay])

    return getSearch;
}

export default useDebounce