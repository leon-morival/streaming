import { Route, Routes } from "react-router-dom";
import Home from "./home/screens/home";
import MovieDetails from "./home/screens/MovieDetails";
import SearchResults from "./pages/SearchResults";
import SearchCategory from "./category/screens/SearchCategory";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category" element={<SearchCategory />} />
      </Routes>
    </>
  );
}

export default App;
