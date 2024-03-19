import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {

    const inputEle = useRef(null)

    useEffect(function () {
        function callback(e) {

            if (document.activeElement === inputEle.current)
                return

            if (e.code === 'Enter') {
                inputEle.current.focus()
                setQuery("")
            }
        }

        return () => document.addEventListener('keydown', callback)
    }, [setQuery])

    function handleQuery(e) {
        setQuery(q => e.target.value)
    }

    return (
        <>
            <input className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => handleQuery(e)}
                ref={inputEle}
            />
        </>
    );
}