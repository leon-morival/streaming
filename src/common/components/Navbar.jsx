import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "../../tmdb/hooks/useFetchCategory"; // Import categories

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for name search
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category search
  const navigate = useNavigate();

  const handleNameSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategorySearch = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      navigate(`/category?category=${selectedCategory}`);
    }
  };

  return (
    <nav className="bg-blue-500 p-4 top-0 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white font-bold text-xl hover:text-gray-200"
        >
          Accueil
        </Link>
        <div className="flex">
          <form onSubmit={handleNameSearch} className="flex mr-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher films..."
              className="px-2 py-1 rounded"
            />
            <button
              type="submit"
              className="ml-2 bg-white text-blue-500 px-3 py-1 rounded"
            >
              Rechercher
            </button>
          </form>
          <form onSubmit={handleCategorySearch} className="flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-1 rounded"
            >
              <option value="">Toutes Catégories</option>
              {categories.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="ml-2 bg-white text-blue-500 px-3 py-1 rounded"
            >
              Filtrer
            </button>
          </form>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
