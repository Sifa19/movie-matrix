export default function WatchedList({
    data,
    setWatchedMovies,
    setSelectedMovieID,
    setIsClose,
}) {
    function handleSetMovie(movie) {
        setSelectedMovieID((s) => movie.imdbID);
        setIsClose(true);
    }

    function removeMovie(id) {
        const updatedList = data.filter((d) => d.imdbID !== id);
        setWatchedMovies(updatedList);
    }

    return (
        <ul className="list">
            {data.map((i) => (
                <>
                    <button
                        className="remove-movie"
                        onClick={() => removeMovie(i.imdbID)}>
                        x
                    </button>
                    <li
                        key={i.imdbID}
                        onClick={() => handleSetMovie(i)}
                        className="list-hover-effect">
                        <img src={i.Poster} alt={i.Title} />
                        <div>
                            <h4>{i.Title}</h4>
                            <div>
                                <span>⭐{i.imdbRating} </span>
                                <span>🌟 {i.starRating} </span>
                                <span>⌛{i.Runtime}</span>
                            </div>
                        </div>
                    </li>
                </>
            ))}
        </ul>
    );
}
