import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import TextExpander from "./TextExpander";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "67da6b37";
// const query = "interstellar";
// const query = "cced";


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("")
  const [query, setQuery] = useState("interstellar")
  const [selectedMovieId, setSelectedMovieID] = useState(tempMovieData[0])

  // http://www.omdbapi.com/?apikey=${KEY}&s=${query}&plot=full

  // http://www.omdbapi.com/?apikey=${KEY}t=harry&plot=full

  // https://tv-api.com/en/API/SearchMovie/k_b58hmvfi/inception 2010

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsError("")
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&plot=full`
        );
        // console.log(res);
        if (!res.ok)
          throw new Error("message..");

        const data = await res.json();

        if (data.Response === 'False')
          throw new Error("movie not found")

        setMovies(data.Search);

      } catch (err) {
        console.log(err);
        if (err.message)
          setIsError(err.message)
        else setIsError("Movie Not Found...")
      }
      finally {
        setIsLoading(false);
      }
    }

    if (query.length < 2) {
      setMovies([])
      setIsError('')
      return
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="container">
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <SearchStatus data={movies} />
      </Navbar>
      <div className="main">
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !isError &&
            <List data={movies}
              setSelectedMovieID={setSelectedMovieID} />}
          {isError && <Error message={isError} />}
        </Box>
        <Box>
          {
            selectedMovieId.length > 0 ?
              <MovieDetails
                selectedMovieId={selectedMovieId}
                setSelectedMovieID={setSelectedMovieID} />
              :
              <>
                <div className="summary">
                  <h4>MOVIES YOU WATCHED</h4>
                  <div className="summary-details">
                    <span>🎞️2 Movies</span>
                    <span>⭐8.65</span>
                    <span>🌟9.5</span>
                    <span>⌛132min</span>
                  </div>
                </div>
                <List data={watchedMovies}
                  setSelectedMovieID={setSelectedMovieID} />
              </>
          }
        </Box>
      </div>
    </div>
  );
}

function Navbar({ children }) {
  return <div className="navbar">{children}</div>;
}

function Logo() {
  return <div className="logo">🎬 movieMatrix</div>;
}

function SearchBar({ query, setQuery }) {

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

function SearchStatus({ data }) {
  return <div className="status">found {data.length} result</div>;
}

function Loading() {
  return <h3>FETCHING MOVIES....</h3>;
}

function Error({ message }) {
  return <p className="error">
    <span>⚠️</span>{message}</p>
}

function Box({ children }) {
  return (
    <div className="box">
      <button className="box-btn">-</button>
      {children}
    </div>
  );
}

function List({ data, setSelectedMovieID }) {

  function handleSetMovie(movie) {
    setSelectedMovieID(s => movie.imdbID)
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

function MovieDetails({ selectedMovieId, setSelectedMovieID }) {

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [starRating, setStarRating] = useState(0);

  useEffect(function () {
    async function getMovieDetails() {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}&plot=full`)

        if (!res.ok)
          throw new Error("Data Not Found")

        const data = await res.json();
        console.log(data);
        setMovie(data)
        setIsLoading(false)
      }
      catch (err) {
        console.log(err);
      }
    }

    getMovieDetails()
  }, [selectedMovieId])

  return <>
    {
      isLoading ?
        <Loading /> :
        <div className="movie-details">
          <Button
            setSelectedMovieID={setSelectedMovieID} />
          <Movie movie={movie} />
          <StarRating
            maxRating={5}
            setStarRating={setStarRating}
            size="1.8"
            startStyle="star-container"
            key={selectedMovieId + 10} />
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
    }
  </>
}

function Button({ setSelectedMovieID }) {
  return <button className="btn-movie-details"
    onClick={() => setSelectedMovieID([])}>
    &larr;
  </button>
}

function Movie({ movie }) {
  return <div className="details">
    <img src={movie.Poster} alt={movie.Title} />
    <div>
      <h3> {movie.Title}</h3>
      <span>{movie.DVD}  &bull; {movie.Runtime}</span>
      <span>{movie.Genre}</span>
      <p> ⭐{movie.imdbRating} IMDB rating</p>
    </div>
  </div>
}


