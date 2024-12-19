import { useState, useEffect } from "react";

const API_BASE_URL = "https://api.kinocheck.com/movies";

const useFetchTrailers = (imdbId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbId) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}?imdb_id=${imdbId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [imdbId]);

  return { data, loading, error };
};

export default useFetchTrailers;
