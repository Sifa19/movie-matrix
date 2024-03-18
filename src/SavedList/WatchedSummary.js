export default function WatchedSummary({ watchedMovies }) {

    function calcAverage(filter) {

        return (
            watchedMovies
                .map((m) => parseInt(m[filter]))
                .reduce((acc, val) => acc + val, 0) / watchedMovies.length
        ).toFixed(2);

    }

    const averageImdbRating = calcAverage("imdbRating")
    const averageUserRating = calcAverage("starRating")
    const averageMovieTime = calcAverage("Runtime") * watchedMovies.length


    return (
        <div className="summary">
            <h4>MOVIES YOU WATCHED</h4>
            <div className="summary-details">
                <span>🎞️{watchedMovies.length} Movies</span>
                <span>⭐{averageImdbRating > 0 ? averageImdbRating : "0"}</span>
                <span>🌟{averageUserRating > 0 ? averageUserRating : "0"}</span>
                <span>⌛{averageMovieTime > 0 ? averageMovieTime : "0"}</span>
            </div>
        </div>
    );
}
