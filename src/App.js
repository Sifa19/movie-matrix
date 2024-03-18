import { useEffect, useState } from "react";

import Navbar from "./Navbar/Navbar";
import Logo from "./Navbar/Logo";
import SearchBar from "./Navbar/SearchBar";
import SearchStatus from "./Navbar/SearchStatus";

import Box from "./CommonComponents/Box";
import Main from "./CommonComponents/Main";

import List from "./SearchedList/List";
import WatchedSummary from "./SavedList/WatchedSummary";
import WatchedList from "./SavedList/WatchedList";

import MovieDetails from "./CommonComponents/MovieDetails";

import Loading from "./CommonComponents/Loading";
import Error from "./CommonComponents/Error";

const KEY = "67da6b37";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [query, setQuery] = useState(null);
  const [selectedMovieId, setSelectedMovieID] = useState(null);
  const [isClose, setIsClose] = useState(false);

  const [watchedMovies, setWatchedMovies] = useState(function () {
    const storedData = localStorage.getItem('watchedMovies')
    return JSON.parse(storedData)
  });


  function handleAddWatched(movie) {
    setWatchedMovies((movies) => {
      return [...movies, movie]
    });
  }

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

  useEffect(function () {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies))
  }, [watchedMovies])



  return (
    <div className="container">
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <SearchStatus data={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && query && <Loading />}

          {!isLoading && !isError && (
            <List
              data={movies}
              setSelectedMovieID={setSelectedMovieID}
              setIsClose={setIsClose}
            />
          )}

          {isError && <Error message={isError} />}
        </Box>

        <Box>
          {isClose ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              watchedMovies={watchedMovies}
              handleAddWatched={handleAddWatched}
              setIsClose={setIsClose}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedList
                data={watchedMovies}
                setWatchedMovies={setWatchedMovies}
                setSelectedMovieID={setSelectedMovieID}
                setIsClose={setIsClose}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
