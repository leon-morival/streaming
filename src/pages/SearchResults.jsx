import React from "react";
import { useLocation } from "react-router-dom";
import useFetchSearch from "../tmdb/hooks/useFetchSearch";
import Navbar from "../common/components/Navbar";
import MovieCard from "../home/components/MovieCard";
import { Link } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("query");
  const { data, loading, error } = useFetchSearch(searchTerm);
  // console.log(JSON.stringify(data, null, 2));
  //   console.log(data?.results);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching search results.</div>;

  return (
    <>
      <Navbar />
      <div className="mt-6">
        <p className="text-center text-4xl font-semibold text-gray-800">
          Résultats pour "<span className="text-blue-600">{searchTerm}</span>"
        </p>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
