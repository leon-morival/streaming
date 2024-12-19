import { useState, useEffect } from "react";

const useFetchMovieDetails = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "13371b82b1b98f36c09c58eb2ea8b75d";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();

        const reviewsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
        );
        const reviewsData = await reviewsResponse.json();

        setData({
          title: data.title,
          description: data.overview,
          genres: data.genres,
          releaseDate: data.release_date,
          rating: Math.round(data.vote_average * 10) / 10,
          posterPath: data.poster_path,
          reviews: reviewsData.results,
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

export default useFetchMovieDetails;
