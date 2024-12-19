import Footer from "../../common/components/Footer";
import Navbar from "../../common/components/Navbar";
import { useLocation } from "react-router-dom";
import useFetchCategory from "../../tmdb/hooks/useFetchCategory";
import { Link } from "react-router-dom";
import MovieCard from "../../home/components/MovieCard";
import { categories } from "../../tmdb/hooks/useFetchCategory";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SearchCategory = () => {
  const query = useQuery();
  const searchTerm = query.get("category");

  const getCategoryName = (categoryId) => {
    const category = categories.genres.find(
      (genre) => genre.id === parseInt(categoryId)
    );
    return category ? category.name : "Inconnu";
  };
  const { data, loading, error } = useFetchCategory(searchTerm);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement.</div>;
  return (
    <>
      <Navbar />
      {/* <p>Résultat pour </p> */}
      <div className="mt-6">
        <p className="text-center text-4xl font-semibold text-gray-800">
          {getCategoryName(searchTerm)}
        </p>
      </div>
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.results.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SearchCategory;
