export default function Movie({ movie }) {
    return (
        <div className="details">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
                <h3> {movie.Title}</h3>
                <span>
                    {movie.DVD} &bull; {movie.Runtime}
                </span>
                <span>{movie.Genre}</span>
                <p> ⭐{movie.imdbRating} IMDB rating</p>
            </div>
        </div>
    );
}
