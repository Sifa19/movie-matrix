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
import { useMovies } from "./Components/useMovies";
import { useLocalStorage } from "./Components/useLocalStorage";

export default function App() {

  const [query, setQuery] = useState(null);
  const { movies, isLoading, isError } = useMovies(query)
  const [selectedMovieId, setSelectedMovieID] = useState(null);
  const [isClose, setIsClose] = useState(false);
  const { value: watchedMovies, setValue: setWatchedMovies } = useLocalStorage([], 'watchedMovies')

  function handleAddWatched(movie) {
    setWatchedMovies((movies) => {
      return [...movies, movie]
    });
  }

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
