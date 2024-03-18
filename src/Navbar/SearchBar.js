
export default function SearchBar({ query, setQuery }) {

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
            />
        </>
    );
}