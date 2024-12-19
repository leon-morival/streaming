import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4  top-0 w-full shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-white font-bold text-xl hover:text-gray-200"
          >
            Home
          </Link>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </nav>
      {/* Optionally, you can display featured movies or other content here */}
    </div>
  );
};

export default Home;
