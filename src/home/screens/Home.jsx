import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import useFetchMovies from "../../tmdb/hooks/useFetch";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetchMovies();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
