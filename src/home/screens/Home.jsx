import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import useFetchMovies from "../../tmdb/hooks/useFetch";
import MovieCard from "../components/MovieCard";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../tmdb/hooks/useFetchCategory";
import { useState } from "react";

const Home = () => {
  const { data, loading, error } = useFetchMovies();
  const [selectedCategory, setSelectedCategory] = useState(""); // State pour la catégorie sélectionnée
  const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger l'utilisateur

  const handleCategorySearch = (categoryId) => {
    if (categoryId) {
      navigate(`/category?category=${categoryId}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Erreur : {error.message}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Section des catégories */}
      <div className="container mx-auto mt-6 px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleCategorySearch(genre.id)} // Filtrer par catégorie
              className="bg-transparent text-gray-800 border-2 border-gray-300 hover:border-gray-600 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section des films */}
      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((movie) => (
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

export default Home;
