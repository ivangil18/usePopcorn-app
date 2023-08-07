import { useEffect, useState } from "react";
import { imbdKey } from "./env.prop";

const KEY = imbdKey;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //OPTIONAL CHAINING
      //   callback?.();

      //BROWSER API
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } //This object has to be added to the fetch for the abort() to work
          );

          if (!res.ok) {
            throw new Error(
              "Something went wrong fetching movies, please check your internet conexion"
            );
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setMovies(data.Search);
          setIsLoading(false);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovies();

      //CLEANUP FUNCTION
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
