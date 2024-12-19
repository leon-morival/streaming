const MovieCard = ({ movie }) => (
  <div className="max-w-full rounded overflow-hidden shadow-lg m-4 transform hover:scale-105 transition duration-300 bg-white">
    <img
      className="h-full  object-cover"
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-gray-800">{movie.title}</div>
      <p className="text-gray-700 text-base">
        {movie.overview.length > 100
          ? `${movie.overview.substring(0, 100)}...`
          : movie.overview}
      </p>
    </div>
  </div>
);
export default MovieCard;
