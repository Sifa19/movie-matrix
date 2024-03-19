import { useState, useEffect } from "react";

const KEY = "67da6b37";
export function useMovies(query) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();

            if (query === null)
                return

            async function fetchMovies() {
                try {
                    setIsError("");
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&plot=full`,
                        { signal: controller.signal }
                    );

                    if (!res.ok) throw new Error("message..");

                    const data = await res.json();
                    if (data.Response === "False") throw new Error("movie not found");

                    setMovies(data.Search);
                    setIsError("");

                } catch (err) {

                    if (err.message) setIsError(err.message);
                    else setIsError("Movie Not Found...");

                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 2) {
                setMovies([]);
                setIsError("");
                return;
            }

            fetchMovies();

            return function () {
                return controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, isError }

}