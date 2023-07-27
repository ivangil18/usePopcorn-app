import { useState } from "react";

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

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar query={query} setQuery={setQuery} moviesCount={movies.length} />
      <main className="main">
        <MoviesList movies={movies} />
        <MoviesWatchedList watched={watched} />
      </main>
    </>
  );
}

function NavBar({ query, setQuery, moviesCount }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{moviesCount}</strong> results
      </p>
    </nav>
  );
}

function Movie({ movie, children }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>{children}</div>
    </li>
  );
}

function MoviesList({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);
  function handleToggle() {
    setIsOpen1((open) => !open);
  }
  return (
    <div className="box">
      <Button onClick={handleToggle}>{isOpen1 ? "–" : "+"}</Button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </Movie>
          ))}
        </ul>
      )}
    </div>
  );
}

function Summary({ avgImdbRating, avgUserRating, avgRuntime }) {
  return (
    <>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </>
  );
}

function MoviesWatchedList({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const [isOpen2, setIsOpen2] = useState(true);

  function handleToggle() {
    setIsOpen2((open) => !open);
  }
  return (
    <div className="box">
      <Button onClick={handleToggle}>{isOpen2 ? "–" : "+"}</Button>;
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <Summary
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
              />
            </div>
          </div>

          <ul className="list">
            {watched.map((movie) => (
              <Movie movie={movie} key={movie.imdbID}>
                <Summary
                  avgImdbRating={movie.imdbRating}
                  avgUserRating={movie.userRating}
                  avgRuntime={movie.runtime}
                />
              </Movie>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
}
