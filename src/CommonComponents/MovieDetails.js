import { useState, useRef, useEffect } from "react";

import Movie from "./Movie";
import StarRating from "../Components/StarRating";
import TextExpander from "../Components/TextExpander";
import Loading from "./Loading";

const KEY = "67da6b37";
export default function MovieDetails({
    selectedMovieId,
    watchedMovies,
    handleAddWatched,
    setIsClose,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [starRating, setStarRating] = useState(0);

    const countStartRating = useRef(0)

    useEffect(function () {
        if (starRating)
            countStartRating.current = countStartRating.current + 1
    }, [starRating])

    const isWatched = watchedMovies
        .map((m) => m.imdbID)
        .includes(selectedMovieId);

    const userRating = watchedMovies.find(
        (m) => m.imdbID === selectedMovieId
    )?.starRating;

    function handleAddtoWatchedMovies() {
        const newWatchedMovie = {
            imdbID: movie.imdbID,
            imdbRating: movie.imdbRating,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            Runtime: movie.Runtime,
            starRating: starRating,
        };
        handleAddWatched(newWatchedMovie);
        setIsClose(false);
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                try {
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}&plot=full`
                    );

                    if (!res.ok) throw new Error("Data Not Found");

                    const data = await res.json();
                    setMovie(data);
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                }
            }

            getMovieDetails();
        },
        [selectedMovieId]
    );

    useEffect(
        function () {
            if (!movie.Title) return;
            document.title = "MOVIE: " + movie.Title;

            return function () {
                document.title = "Matrix";
            };
        },
        [movie.Title]
    );

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="movie-details">
                    <button
                        className="btn-movie-details"
                        onClick={() => setIsClose(false)}
                    >
                        &larr;
                    </button>
                    <Movie movie={movie} />
                    <div className="star-container">
                        {!isWatched ? (
                            <>
                                <StarRating
                                    maxRating={5}
                                    setStarRating={setStarRating}
                                    size="1.8"
                                    key={selectedMovieId + 10}
                                />
                                {starRating > 0 && (
                                    <button
                                        className="add-to-list"
                                        onClick={handleAddtoWatchedMovies}
                                    >
                                        + Add To list
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="add-to-list">
                                You Rated This Movie {userRating} ⭐
                            </div>
                        )}
                    </div>
                    <TextExpander
                        data={movie.Plot}
                        showDefault={false}
                        fontSize="14px"
                        fontColor="#adb5bd"
                        buttonColor="#7950f2"
                        startStyle="text-container"
                        key={selectedMovieId}
                    />
                    <p>Starring : {movie.Actors}</p>
                    <p>Directed By : {movie.Director}</p>
                </div>
            )}
        </>
    );
}
