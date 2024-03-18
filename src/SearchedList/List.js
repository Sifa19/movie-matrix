export default function List({ data, setSelectedMovieID, setIsClose }) {

    function handleSetMovie(movie) {
        setSelectedMovieID(s => movie.imdbID)
        setIsClose(true)
    }

    return (
        <ul className="list">
            {data.map((i) => (
                <li key={i.imdbID}
                    onClick={() => handleSetMovie(i)}
                    className="list-hover-effect">
                    <img src={i.Poster} alt={i.Title} />
                    <div>
                        <h4>{i.Title}</h4>
                        <span>🗓️ {i.Year}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}