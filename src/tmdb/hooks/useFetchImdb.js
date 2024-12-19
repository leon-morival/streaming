import { useState, useEffect } from "react";

const useFetchImdb = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "13371b82b1b98f36c09c58eb2ea8b75d";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${API_KEY}`
        );
        const data = await response.json();

        // Set data including IMDb ID
        setData({
          imdbId: data.imdb_id, // Add IMDb ID
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { data, loading, error };
};

export default useFetchImdb;
