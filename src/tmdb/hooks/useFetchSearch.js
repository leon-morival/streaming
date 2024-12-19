import { useState, useEffect } from "react";

const useFetchMovies = (searchTerm) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "13371b82b1b98f36c09c58eb2ea8b75d";
  const BASE_URL = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(
            searchTerm
          )}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.results);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return { data, loading, error };
};

export default useFetchMovies;
